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
        Schema::create('rdprograms', function (Blueprint $table) {
            $table->id('prog_id');
            $table->string('acct_code');
            $table->text('title');
            $table->text('proponents');
            $table->string('smonth');
            $table->integer('sday');
            $table->integer('syear');
            $table->string('emonth');
            $table->integer('eday');
            $table->integer('eyear');
            $table->string('extmonth')->nullable();
            $table->integer('extday')->nullable();
            $table->integer('extyear')->nullable();
            $table->string('type');
            $table->string('status');
            $table->text('fund_source');
            $table->decimal('budget', 30,2);
            $table->integer('year_approved');
            $table->text('counter_source');
            $table->decimal('counter_amt', 30, 2);
            $table->text('categories');
            $table->text('collab_agencies')->nullable();
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
        Schema::dropIfExists('rdprograms');
    }
};
