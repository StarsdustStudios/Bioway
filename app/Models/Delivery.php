<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    protected $fillable = [
        'location_id',
        'price',
        'driver_fee',
    ];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
