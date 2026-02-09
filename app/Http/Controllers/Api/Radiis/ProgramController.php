<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDProgram;
// use App\Http\Requests\StoreRDProgramRequest;
// use App\Http\Requests\UpdateRDProgramRequest;
use App\Http\Resources\Radiis\ProgramResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maxYear = RDProgram::max('syear');
        $secondYear = $maxYear - 1;
        //-----------------------------------------------------
        $type_data = RDProgram::select('type', DB::raw('count(*) as total'))
        ->groupBy('type')
        ->get();
        //-----------------------------------------------------
        $per_year = RDProgram::select('syear', DB::raw('count(*) as total'))
        ->groupBy('syear')
        ->orderBy('syear', 'desc')
        ->take(5)
        ->get()
        ->reverse();
        //-----------------------------------------------------
        $per_budget = RDProgram::select('syear', DB::raw('sum(budget) as total'))
        ->groupBy('syear')
        ->get();
        //-----------------------------------------------------
        $mxyear_value = RDProgram::where('syear', $maxYear)->count();
        $prevyear_value_test = RDProgram::where('syear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = (($mxyear_value-$prevyear_value)/$prevyear_value) * 100;
        //-----------------------------------------------------
        $total_prog = RDProgram::count();
        $complete_prog = RDProgram::where('status', 'Completed')->count();
        $ongoing_prog = RDProgram::where('status', 'Ongoing')->count();

        $comp_perc = ($complete_prog/$total_prog)*100;
        $ong_perc = ($ongoing_prog/$total_prog)*100;


        return response()->json([
            'stats' => [
                'total_programs'   => RDProgram::count(),
                'completed_programs' => RDProgram::where('status', 'Completed')->count(),
                'ongoing_programs'   => RDProgram::where('status', 'Ongoing')->count(),
                'new_programs'   => RDProgram::where('syear', $maxYear)->count(),
                'total_budget' => RDProgram::sum('budget'),
                'new_budget' => RDProgram::where('syear', $maxYear)->sum('budget'),
                'max_year' => RDProgram::max('syear'),
                'prev_year' => $secondYear,
            ],
            'charts' => [
                'type_labels' => $type_data->pluck('type'),
                'type_counts' => $type_data->pluck('total'),
                'year_labels' => $per_year->pluck('syear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'budget_labels' => $per_budget->pluck('syear'), 
                'budget_totals' => $per_budget->pluck('total'),
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
