<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participants extends Model
{
    protected $table = 'Participants';
    protected $primaryKey = 'Id';
    public $timestamps = false;

    const CREATED_AT = 'CreateDate';
    const UPDATED_AT = 'ModifiedDate';
}
