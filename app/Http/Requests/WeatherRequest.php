<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use GuzzleHttp\Client;


class WeatherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
    public function getWeatherData($location_id)
    {
        $client = new Client();
        $base_url = "http://api.openweathermap.org/data/2.5/forecast/";
        $api_key = config("services.weather_forecast.key");
        $url = $base_url . "?id=" . $location_id . "&lang=ja&units=metric&appid=" . $api_key;

        $response = $client->request("POST", $url);

        $forecast_data = json_decode($response->getBody(), true);

        return $forecast_data["list"];
    }
}
