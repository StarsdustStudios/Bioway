<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = [
        'start',
        'title',
        'desc',
        'price',
        'tour_image',
        'passenger',
        'luggage',
    ];

    public function locations()
{
    return $this->belongsToMany(Location::class, 'tour_locations', 'tour_id', 'location_id')
                ->withPivot('id'); // Add this line
}

}
