<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;

class LocationController extends Controller
{
    public function get(Location $location)
    {
        return response()->json(["locations_data" => $location->get()]);
    }
}
