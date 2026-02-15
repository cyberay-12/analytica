<?php

namespace App\Http\Controllers\Api\Radiis;

use App\Http\Controllers\Controller;
use App\Models\RDIPRight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class IPRightController extends Controller
{
    public function index(Request $request)
    {
        $query = RDIPRight::query();
        $grouping = $request->query('group_by', $request->groupby);

        $maxYear = $request->year ?? RDIPRight::max('filyear');
        $secondYear = $maxYear - 1;
        $permMaxYear = RDIPRight::max('filyear');

        $stackedData = RDIPRight::select('filyear', $grouping, DB::raw('count(*) as total'))
        ->whereBetween('filyear', [$permMaxYear-6, $permMaxYear])
        ->groupBy('filyear', $grouping)
        ->get();

        $filteredData = (clone $query)
        ->when($request->year, fn($q) => $q->where('filyear', $request->year))
        ->get();
        
        //-----------------------------------------------------
        $granted = $filteredData
        ->where('grantyear', $maxYear)
        ->count();

        $expired = $filteredData
        ->where('expyear', $maxYear)
        ->count();

        $per_type = $filteredData
        ->groupBy('type')
        ->map(function ($items) {
        return $items->count(); 
        });

        $per_util = $filteredData
        ->groupBy('utilization')
        ->map(function ($items) {
        return $items->count(); 
        });

        $per_unit = $filteredData
        ->groupBy('acct_unit')
        ->map(function ($items) {
        return $items->count(); 
        });

        //-----------------------------------------------------
        $per_year = RDIPRight::select('filyear', DB::raw('count(*) as total'))
        ->groupBy('filyear')
        ->orderBy('filyear', 'desc')
        ->take(7)
        ->get()
        ->reverse();

        //-----------------------------------------------------
        $mxyear_value = RDIPRight::where('filyear', $maxYear)->count();
        $prevyear_value_test = RDIPRight::where('filyear', $secondYear)->count();
        $prevyear_value = ($prevyear_value_test > 0) ? $prevyear_value_test : 0;

        $year_perc = ($prevyear_value == 0) ? 0:((($mxyear_value-$prevyear_value)/$prevyear_value) * 100);
        //---------------------------------------------------------
        $all_year = RDIPRight::select('filyear')
        ->distinct()
        ->orderBy('filyear', 'desc')
        ->pluck('filyear') 
        ->reverse();

        return response()->json([
            'stats' => [
                'total_ipr'   => RDIPRight::where('filyear','<=',$maxYear)->count(),
                'new_ipr'   => $filteredData->where('filyear', $maxYear)->count(),
                'max_year' => $filteredData->max('filyear'),
                'prev_year' => $secondYear,
                'all_year' => $all_year,
                'granted' => $granted,
                'expired' => $expired,
            ],
            'charts' => [
                'year_labels' => $per_year->pluck('filyear')->map(fn($year) => (string)$year), 
                'year_counts' => $per_year->pluck('total'),
                'per_util_labels' => $per_util->keys(),
                'per_util_values' => $per_util->values(),
                'per_type_labels' => $per_type->keys(),
                'per_type_values' => $per_type->values(),
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
                        $match = $rawResults->where('filyear', $year)
                                            ->where($grouping, $name)
                                            ->first();
                        return $match ? $match->total : 0;
                    })
                ];
            });

            $totalLine = collect($years)->map(function ($year) use ($rawResults) {
                return $rawResults->where('filyear', $year)->sum('total');
            });

            return [
                'labels' => $years,
                'series' => $series,
                'total_line' => $totalLine
            ];
        }
}
