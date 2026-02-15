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
        Schema::create('rdpresentations', function (Blueprint $table) {
            $table->id('pres_id');
            $table->text('title');
            $table->text('presenters');
            $table->text('out_pres')->nullable();
            $table->text('forum_title');
            $table->text('sponsor')->nullable();
            $table->text('organizer');
            $table->string('type');
            $table->string('level');
            $table->string('category');
            $table->string('presmonth');
            $table->integer('presday');
            $table->integer('presyear');
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
        Schema::dropIfExists('rdpresentations');
    }
};
