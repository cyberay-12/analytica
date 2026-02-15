<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDPresentation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PresentationController extends Controller
{
    public function index(Request $request)
    {
        $query = RDPresentation::query();
        $grouping = $request->query('group_by', $request->groupby);

        $maxYear = $request->year ?? RDPresentation::max('presyear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDPresentation::max('presyear');

        $stackedData = RDPresentation::select('presyear', $grouping, DB::raw('count(*) as total'))
        ->whereBetween('presyear', [$permMaxYear-6, $permMaxYear])
        ->groupBy('presyear', $grouping)
        ->get();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('presyear', $request->year))
        ->get();
        
        //-----------------------------------------------------
        $per_type = $filteredData
        ->groupBy('type')
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
        $per_year = RDPresentation::select('presyear', DB::raw('count(*) as total'))
        ->groupBy('presyear')
        ->orderBy('presyear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        //-----------------------------------------------------
        $mxyear_value = RDPresentation::where('presyear', $maxYear)->count();
        $prevyear_value_test = RDPresentation::where('presyear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //---------------------------------------------------------
        $all_year = RDPresentation::select('presyear')
        ->distinct()
        ->orderBy('presyear', 'desc')
        ->pluck('presyear') 
        ->reverse();

        return response()->json([
            'stats' => [
                'total_pub'   => RDPresentation::where('presyear','<=',$maxYear)->count(),
                'new_pub'   => $filteredData->where('presyear', $maxYear)->count(),
                'max_year' => $filteredData->max('presyear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
            ],
            'charts' => [
                'year_labels' => $per_year->pluck('presyear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'per_category_labels' => $per_category->keys(),
                'per_category_values' => $per_category->values(),
                'per_type_labels' => $per_type->keys(),
                'per_type_values' => $per_type->values(),
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
                        $match = $rawResults->where('presyear', $year)
                                            ->where($grouping, $name)
                                            ->first();
                        return $match ? $match->total : 0;
                    })
                ];
            });

            $totalLine = collect($years)->map(function ($year) use ($rawResults) {
                return $rawResults->where('presyear', $year)->sum('total');
            });

            return [
                'labels' => $years,
                'series' => $series,
                'total_line' => $totalLine
            ];
        }
}
