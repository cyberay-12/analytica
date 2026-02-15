<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDAward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AwardController extends Controller
{
    public function index(Request $request)
    {
        $query = RDAward::query();
        $grouping = $request->query('group_by', $request->groupby);

        $maxYear = $request->year ?? RDAward::max('awdyear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDAward::max('awdyear');

        $stackedData = RDAward::select('awdyear', $grouping, DB::raw('count(*) as total'))
        ->whereBetween('awdyear', [$permMaxYear-6, $permMaxYear])
        ->groupBy('awdyear', $grouping)
        ->get();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('awdyear', $request->year))
        ->get();
        
        //-----------------------------------------------------
        $per_mode = $filteredData
        ->groupBy('mode')
        ->map(function ($items) {
        return $items->count(); 
        });

        $per_category = $filteredData
        ->groupBy('category')
        ->map(function ($items) {
        return $items->count(); 
        });

        $per_level = $filteredData
        ->groupBy('level')
        ->map(function ($items) {
        return $items->count(); 
        });

        $per_unit = $filteredData
        ->groupBy('acct_unit')
        ->map(function ($items) {
        return $items->count(); 
        });

        //-----------------------------------------------------
        $per_year = RDAward::select('awdyear', DB::raw('count(*) as total'))
        ->groupBy('awdyear')
        ->orderBy('awdyear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        //-----------------------------------------------------
        $mxyear_value = RDAward::where('awdyear', $maxYear)->count();
        $prevyear_value_test = RDAward::where('awdyear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //---------------------------------------------------------
        $all_year = RDAward::select('awdyear')
        ->distinct()
        ->orderBy('awdyear', 'desc')
        ->pluck('awdyear') 
        ->reverse();

        return response()->json([
            'stats' => [
                'total_award'   => RDAward::where('awdyear','<=',$maxYear)->count(),
                'new_award'   => $filteredData->where('awdyear', $maxYear)->count(),
                'max_year' => $filteredData->max('awdyear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
            ],
            'charts' => [
                'year_labels' => $per_year->pluck('awdyear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'per_category_labels' => $per_category->keys(),
                'per_category_values' => $per_category->values(),
                'per_mode_labels' => $per_mode->keys(),
                'per_mode_values' => $per_mode->values(),
                'per_level_labels' => $per_level->keys(),
                'per_level_values' => $per_level->values(),
                'per_unit_labels' => $per_unit->keys(),
                'per_unit_values' => $per_unit->values(),
                'stacked' => $this->formatStacked($stackedData, $grouping, $permMaxYear),
            ],
            'percentages' => [
                'year_percent' => number_format($year_perc, 2),
            ],
        ]);
    }

    protected function formatStacked($rawResults, $grouping, $permMaxYear)
        {
            $years = range($permMaxYear-6, $permMaxYear);
            
            // 1. Get unique names for the legend (e.g., "Journal", "Book")
            $categories = $rawResults->pluck($grouping)->unique()->filter()->values();

            // 2. Build the series for each category
            $series = $categories->map(function ($name) use ($rawResults, $years, $grouping) {
                return [
                    'name' => $name,
                    'counts' => collect($years)->map(function ($year) use ($rawResults, $name, $grouping) {
                        // Find the specific row for this year and category
                        $match = $rawResults->where('awdyear', $year)
                                            ->where($grouping, $name)
                                            ->first();
                        return $match ? $match->total : 0;
                    })
                ];
            });

            $totalLine = collect($years)->map(function ($year) use ($rawResults) {
                return $rawResults->where('awdyear', $year)->sum('total');
            });

            return [
                'labels' => $years,
                'series' => $series,
                'total_line' => $totalLine
            ];
        }
}
