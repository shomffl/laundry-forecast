<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fiilable = [
        "name", "name_id"
    ];

    public function users(){
        return $this -> belongsToMany("App\User", "user_location");
    }
}
