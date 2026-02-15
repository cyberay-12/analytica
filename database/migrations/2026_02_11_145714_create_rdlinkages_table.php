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
        Schema::create('rdlinkages', function (Blueprint $table) {
            $table->id('link_id');
            $table->text('name');
            $table->string('effmonth');
            $table->integer('effday');
            $table->integer('effyear');
            $table->string('expmonth');
            $table->integer('expday');
            $table->integer('expyear');
            $table->string('type');
            $table->string('level');
            $table->string('status');
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
        Schema::dropIfExists('rdlinkages');
    }
};