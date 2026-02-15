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
        Schema::create('rdiprights', function (Blueprint $table) {
            $table->id('ipr_id');
            $table->text('title');
            $table->text('tech_makers');
            $table->text('out_tech_makers')->nullable();
            $table->string('app_no');
            $table->string('filmonth');
            $table->integer('filday');
            $table->integer('filyear');
            $table->string('grantmonth')->nullable();
            $table->integer('grantday')->nullable();
            $table->integer('grantyear')->nullable();
            $table->string('expmonth')->nullable();
            $table->integer('expday')->nullable();
            $table->integer('expyear')->nullable();
            $table->string('type');
            $table->string('utilization');
            $table->text('product')->nullable();
            $table->string('category');
            $table->text('acct_unit');
            $table->text('oth_inv_unit')->nullable();
            $table->text('keywords')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rdiprights');
    }
};
