<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->string('tour_image')->nullable()->after('price');
            $table->string('title')->nullable()->after('start');
            $table->int('passanger')->nullable()->after('tour_image');
            $table->int('luggage')->nullable()->after('passanger');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn('tour_image');
            $table->dropColumn('title');
            $table->dropColumn('passanger');
            $table->dropColumn('luggage');
        });
    }
};
