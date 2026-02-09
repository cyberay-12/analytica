<?php

namespace App\Http\Resources\Radiis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->prog_id,
            'start_month' => $this->smonth,
            'start_year' => $this->syear,
            'type' => $this->type,
            'status' => $this->status,
            'fund_source' => $this->fund_source,
            'budget' => $this->budget,
            'acct_unit' => $this->acct_unit,
        ];
    }
}
