<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\WeatherRequest;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function get(Request $request)
    {
        $location_id = $request["location_name_id"];
        $weather = new WeatherRequest();
        $weather_data = $weather->getWeatherData($location_id);
        logger($weather_data);
        return response()->json(["data" => $weather_data]);
    }
}
