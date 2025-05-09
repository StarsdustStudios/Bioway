<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'brand_logo',
    ];

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class);
    }

    public function getLogoUrlAttribute()
    {
        return $this->brand_logo ? Storage::url($this->brand_logo) : null;
    }
}
