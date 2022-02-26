<?php
use App\Http\Controllers\LocationController;


Auth::routes();

Route::group(["middleware" => ["auth"]], function(){
    
    Route::get("locations/get", "LocationController@get");


    Route::get('/{any}', function () {
        return view('index');
    })->where("any", ".*");
});

