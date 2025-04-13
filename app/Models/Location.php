<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $fillable = [
        'name',
        'location_image',
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
}
