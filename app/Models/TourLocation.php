<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourLocation extends Model
{
    protected $fillable = [
        'tour_id',
        'location_id',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
