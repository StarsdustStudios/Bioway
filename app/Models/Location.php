<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $fillable = [
        'city_name',
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function carters()
    {
        return $this->hasMany(Carter::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    public function departures(): HasMany
    {
        return $this->hasMany(ShuttleBus::class, 'from');
    }

    public function arrivals(): HasMany
    {
        return $this->hasMany(ShuttleBus::class, 'to');
    }

    public function tours()
    {
        return $this->belongsToMany(Tour::class, 'tour_locations', 'location_id', 'tour_id');
    }


}
