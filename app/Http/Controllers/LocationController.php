<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Location;
use App\User;

class LocationController extends Controller
{
    public function get(Location $location)
    {
        return response()->json(["locations_data" => $location->get()]);
    }
    public function store(Request $request)
    {
        $user_id = Auth::id();
        $user_info = User::find($user_id);
        $input_locations = $request["locations"];
        $user_info->locations()->attach($input_locations);
        
        return response()->json(["comment" => "data has been stored."]);
    }
}