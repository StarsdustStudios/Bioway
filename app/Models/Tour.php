<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = [
        'start',
        'desc',
        'price',
    ];

    public function locations()
    {
        return $this->belongsToMany(Location::class, 'tour_locations');
    }
}
