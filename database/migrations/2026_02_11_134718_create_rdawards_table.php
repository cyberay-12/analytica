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
        Schema::create('rdawards', function (Blueprint $table) {
            $table->id('awd_id');
            $table->text('title');
            $table->text('recipient');
            $table->text('out_rec')->nullable();
            $table->text('event');
            $table->text('sponsor');
            $table->text('organizer');
            $table->string('mode');
            $table->string('level');
            $table->string('category');
            $table->string('awdmonth');
            $table->integer('awdday');
            $table->integer('awdyear');
            $table->text('acct_unit');
            $table->text('oth_inv_unit')->nullable();
            $table->text('keywords');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rdawards');
    }
};
