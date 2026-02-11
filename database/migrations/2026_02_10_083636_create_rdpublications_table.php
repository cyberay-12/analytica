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
        Schema::create('rdpublications', function (Blueprint $table) {
            $table->id('pub_id');
            $table->text('title');
            $table->text('authors');
            $table->text('out_auth')->nullable();
            $table->text('stud_auth')->nullable();
            $table->text('editors')->nullable();
            $table->text('out_edit')->nullable();
            $table->text('journ_title');
            $table->string('vol_iss_no');
            $table->string('issn_isbn')->nullable();
            $table->string('page_no')->nullable();
            $table->string('journ_ind')->nullable();
            $table->string('level');
            $table->string('category');
            $table->string('pubmonth');
            $table->integer('pubday');
            $table->integer('pubyear');
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
        Schema::dropIfExists('rdpublications');
    }
};
