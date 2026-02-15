<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RDProject::query();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('syear', $request->year))
        ->get();

        $maxYear = $request->year ?? RDProject::max('syear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDProject::max('syear');
        //-----------------------------------------------------
        $type_res = $filteredData
        ->where('type', 'Research')
        ->count();

        $type_dev = $filteredData
        ->where('type', 'Development')
        ->count();

        $type_resdev = $filteredData
        ->where('type', 'Research and Development')
        ->count();
        //-----------------------------------------------------
        $per_year = RDProject::select('syear', DB::raw('count(*) as total'))
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse();
        //-----------------------------------------------------
        $per_budget = RDProject::select('syear', DB::raw('sum(budget) as total'))
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        $budget_res = RDProject::select('syear', DB::raw('sum(budget) as total'))
        ->where('type', 'Research')
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse()
        ->keyBy('syear');

        $budget_research = collect(range($permMaxYear - 6, $permMaxYear))
            ->map(function ($year) use ($budget_res) {
            return [
                'syear' => $year,
                // If the year exists in DB, use that total, otherwise use 0
                'total' => isset($budget_res[$year]) ? (float)$budget_res[$year]->total : 0
            ];
        });

        $budget_dev = RDProject::select('syear', DB::raw('sum(budget) as total'))
        ->where('type', 'Development')
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(5)
        ->get()
        ->reverse()
        ->keyBy('syear');

        $budget_develop = collect(range($permMaxYear - 6, $permMaxYear))
            ->map(function ($year) use ($budget_dev) {
            return [
                'syear' => $year,
                // If the year exists in DB, use that total, otherwise use 0
                'total' => isset($budget_dev[$year]) ? (float)$budget_dev[$year]->total : 0
            ];
        });

        $budget_resdev = RDProject::select('syear', DB::raw('sum(budget) as total'))
        ->where('type', 'Research and Development')
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse()
        ->keyBy('syear');

        $budget_resdevelop = collect(range($permMaxYear - 6, $permMaxYear))
            ->map(function ($year) use ($budget_resdev) {
            return [
                'syear' => $year,
                // If the year exists in DB, use that total, otherwise use 0
                'total' => isset($budget_resdev[$year]) ? (float)$budget_resdev[$year]->total : 0
            ];
        });
        //-----------------------------------------------------
        $mxyear_value = RDProject::where('syear', $maxYear)->count();
        $prevyear_value_test = RDProject::where('syear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //-----------------------------------------------------
        $total_prog = $filteredData->count();
        $complete_prog = $filteredData->where('status', 'Completed')->count();
        $ongoing_prog = $filteredData->where('status', 'Ongoing')->count();

        $comp_perc = ($complete_prog/$total_prog)*100;
        $ong_perc = ($ongoing_prog/$total_prog)*100;
        //---------------------------------------------------------
        $all_year = RDProject::select('syear')
        ->distinct()
        ->orderBy('syear', 'desc')
        ->pluck('syear') 
        ->reverse();


        return response()->json([
            'stats' => [
                'total_projects'   => RDProject::where('syear','<=',$maxYear)->count(),
                'completed_projects' => $filteredData->where('status', 'Completed')->count(),
                'ongoing_projects'   => $filteredData->where('status', 'Ongoing')->count(),
                'new_projects'   => $filteredData->where('syear', $maxYear)->count(),
                'total_budget' => RDProject::where('syear','<=', $maxYear)->sum('budget'),
                'new_budget' => $filteredData->where('syear', $maxYear)->sum('budget'),
                'max_year' => $filteredData->max('syear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
            ],
            'charts' => [
                'type_res' => $type_res,
                'type_dev' => $type_dev,
                'type_resdev' => $type_resdev,
                'year_labels' => $per_year->pluck('syear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'budget_labels' => $per_budget->pluck('syear'), 
                'budget_totals' => $per_budget->pluck('total'),
                'res_sums' => $budget_research->pluck('total'),
                'dev_sums' => $budget_develop->pluck('total'),
                'resdev_sums' => $budget_resdevelop->pluck('total'),
            ],
            'percentages' => [
                'year_percent' => number_format($year_perc, 2),
                'complete_perc' => number_format($comp_perc, 2),
                'ongoing_perc' => number_format($ong_perc, 2),
            ],
        ]);
    }


    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(RDProject $rDProject)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(RDProject $rDProject)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, RDProject $rDProject)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(RDProject $rDProject)
    // {
    //     //
    // }
}
