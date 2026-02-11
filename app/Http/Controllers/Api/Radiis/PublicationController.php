<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDPublication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RDPublication::query();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('pubyear', $request->year))
        ->get();
        
        $maxYear = $request->year ?? RDPublication::max('pubyear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDPublication::max('pubyear');
        //-----------------------------------------------------
        $per_category = $filteredData
        ->groupBy('category')
        ->map(function ($items) {
        return $items->count(); // Count the number of items in this specific group
        });

        $per_level = $filteredData
        ->groupBy('level')
        ->map(function ($items) {
        return $items->count(); // Count the number of items in this specific group
        });

        $per_unit = $filteredData
        ->groupBy('acct_unit')
        ->map(function ($items) {
        return $items->count(); // Count the number of items in this specific group
        });

        //-----------------------------------------------------
        $per_year = RDPublication::select('pubyear', DB::raw('count(*) as total'))
        ->groupBy('pubyear')
        ->orderBy('pubyear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        $per_typeyear = RDPublication::select('pubyear', DB::raw('count(*) as total'))
        ->groupBy('pubyear')
        ->orderBy('pubyear', 'desc')
        ->take(7)
        ->get()
        ->reverse();
        //-
        //-----------------------------------------------------
        $mxyear_value = RDPublication::where('pubyear', $maxYear)->count();
        $prevyear_value_test = RDPublication::where('pubyear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //---------------------------------------------------------
        $all_year = RDPublication::select('pubyear')
        ->distinct()
        ->orderBy('pubyear', 'desc')
        ->pluck('pubyear') 
        ->reverse();


        return response()->json([
            'stats' => [
                'total_pub'   => RDPublication::where('pubyear','<=',$maxYear)->count(),
                'new_pub'   => $filteredData->where('pubyear', $maxYear)->count(),
                'max_year' => $filteredData->max('pubyear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
            ],
            'charts' => [
                'year_labels' => $per_year->pluck('pubyear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'per_category_labels' => $per_category->keys(),
                'per_category_values' => $per_category->values(),
                'per_level_labels' => $per_level->keys(),
                'per_level_values' => $per_level->values(),
                'per_unit_labels' => $per_unit->keys(),
                'per_unit_values' => $per_unit->values(),
            ],
            'percentages' => [
                'year_percent' => number_format($year_perc, 2),
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
    // public function show(RDPublication $rDPublication)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(RDPublication $rDPublication)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, RDPublication $rDPublication)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(RDPublication $rDPublication)
    // {
    //     //
    // }
}
