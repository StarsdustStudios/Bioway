<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    protected $fillable = [
        'brand_id',
        'model',
        'car_image',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    public function shuttleBuses(): HasMany
    {
        return $this->hasMany(ShuttleBus::class);
    }
    
    public function carters(): HasMany
    {
        return $this->hasMany(Carter::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->car_image ? Storage::url($this->car_image) : null;
    }
}
