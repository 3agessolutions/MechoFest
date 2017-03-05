<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Participants', function (Blueprint $table) {
            $table->increments('id');
            $table->text('ParticipantName');
            $table->char('ParticipantGender', 1);
            $table->text('ParticipantCollege');
            $table->smallInteger('Year');
            $table->text('Department');
            $table->text('ParticipantEmail');
            $table->string('ParticipantPhone', 15);
            $table->text('ParticipantEvents');
            $table->text('PresentationTopic');
            $table->text('CreateDate');
            $table->text('ModifiedDate');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('Participants');
    }
}
