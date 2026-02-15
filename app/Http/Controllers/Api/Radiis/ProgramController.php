<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDProgram;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RDProgram::query();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('syear', $request->year))
        ->get();

        $maxYear = $request->year ?? RDProgram::max('syear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDProgram::max('syear');
        //-----------------------------------------------------
        $type_res = $filteredData
        ->where('type', 'Research')
        ->count();

        $type_dev = $filteredData
        ->where('type', 'Development')
        ->count();
        //-----------------------------------------------------
        $per_year = RDProgram::select('syear', DB::raw('count(*) as total'))
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse();
        //-----------------------------------------------------
        $per_budget = RDProgram::select('syear', DB::raw('sum(budget) as total'))
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        $budget_res = RDProgram::select('syear', DB::raw('sum(budget) as total'))
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

        $budget_dev = RDProgram::select('syear', DB::raw('sum(budget) as total'))
        ->where('type', 'Development')
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(7)
        ->get()
        ->reverse()
        ->keyBy('syear');;

        $budget_develop = collect(range($permMaxYear - 6, $permMaxYear))
            ->map(function ($year) use ($budget_dev) {
            return [
                'syear' => $year,
                // If the year exists in DB, use that total, otherwise use 0
                'total' => isset($budget_dev[$year]) ? (float)$budget_dev[$year]->total : 0
            ];
        });
        //-----------------------------------------------------
        $mxyear_value = RDProgram::where('syear', $maxYear)->count();
        $prevyear_value_test = RDProgram::where('syear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //-----------------------------------------------------
        $total_prog = $filteredData->count();
        $complete_prog = $filteredData->where('status', 'Completed')->count();
        $ongoing_prog = $filteredData->where('status', 'Ongoing')->count();

        $comp_perc = ($complete_prog/$total_prog)*100;
        $ong_perc = ($ongoing_prog/$total_prog)*100;
        //---------------------------------------------------------
        $all_year = RDProgram::select('syear')
        ->distinct()
        ->orderBy('syear', 'desc')
        ->pluck('syear') 
        ->reverse();


        return response()->json([
            'stats' => [
                'total_programs'   => RDProgram::where('syear','<=',$maxYear)->count(),
                'completed_programs' => $filteredData->where('status', 'Completed')->count(),
                'ongoing_programs'   => $filteredData->where('status', 'Ongoing')->count(),
                'new_programs'   => $filteredData->where('syear', $maxYear)->count(),
                'total_budget' => RDProgram::where('syear','<=', $maxYear)->sum('budget'),
                'new_budget' => $filteredData->where('syear', $maxYear)->sum('budget'),
                'max_year' => $filteredData->max('syear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
            ],
            'charts' => [
                'type_res' => $type_res,
                'type_dev' => $type_dev,
                'year_labels' => $per_year->pluck('syear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'budget_labels' => $per_budget->pluck('syear'), 
                'budget_totals' => $per_budget->pluck('total'),
                'res_sums' => $budget_research->pluck('total'),
                'dev_sums' => $budget_develop->pluck('total'),
            ],
            'percentages' => [
                'year_percent' => number_format($year_perc, 2),
                'complete_perc' => number_format($comp_perc, 2),
                'ongoing_perc' => number_format($ong_perc, 2),
            ],
        ]);
    }

    // 'recent_programs' => ProgramResource::collection(RDProgram::latest()->take(5)->get()),
            // 'categories_distribution' => RDProgram::select('category', \DB::raw('count(*) as total'))
            //                                 ->groupBy('category')
            //                                 ->get()

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(StoreRDProgramRequest $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(RDProgram $rDProgram)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(RDProgram $rDProgram)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdateRDProgramRequest $request, RDProgram $rDProgram)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(RDProgram $rDProgram)
    // {
    //     //
    // }
}
