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
        $weather_array = array();
        
        foreach($weather_data as $one_of_data){
            $one_of_forecast_array = array();
            
            $weather_info = WeatherController::weather_info($one_of_data);
        
            $date = $one_of_data["dt_txt"];
            
            $temp = $one_of_data["main"]["temp"];
            
            $humidity = $one_of_data["main"]["humidity"]; 
            
            $wind_spped = $one_of_data["wind"]["speed"];
            
            $wind = WeatherController::wind_info($one_of_data["wind"]["speed"]);
            
            $exponent = WeatherController::laundry_exponent($temp, $humidity);

            $recommend = WeatherController::laundry_recommendation($weather_info["概要"], $exponent);
            
            $one_of_forecast_array = array("日付" => $date, "天気" => $weather_info, "気温" => $temp, "湿度" => $humidity, "風" => $wind, "洗濯関数" => $exponent, "おすすめ度" => $recommend);
            
            array_push($weather_array, $one_of_forecast_array);
        }
        return response()->json(["weather_data" => $weather_array]);

    }
    public function weather_info($one_of_data)
   {    
        # 天気の概要
        $overview = $one_of_data["weather"][0]["main"];
        
        # 天気の詳細
        $detail = $one_of_data["weather"][0]["description"];
        
        # 外干しの可否
        $judgment_weather_condition = WeatherController::weather_condition($one_of_data["weather"][0]["main"]);
        
        # 天気に対応したアイコン
        $icon = "http://openweathermap.org/img/wn/" . $one_of_data["weather"][0]["icon"] . "@2x.png";
        

        # 上記のデータを連想配列形式にする
        $weather = array("概要" => $overview, "詳細" => $detail, "外干しの可否" => $judgment_weather_condition, "画像" => $icon);
        
        return $weather;
   }
   
   public function wind_info($weather)
   {
        # 引数として渡された値を風速としてそのまま格納
        $wind_speed = $weather;
        
        # wind_condition関数を呼び出して、返却された値を変数に格納
        $wind_condition = WeatherController::wind_condition($wind_speed);
        
        #　上記のデータを連想配列形式に格納する
        $wind = array("風速" => $wind_speed, "風の状態" => $wind_condition);
        
        return $wind;
   }
   
   // 外干しをできるかどうか判別するための関数
   public function weather_condition($weather)
   {
        $condition_text = "";
        if ($weather == "Clear"){
            $condition_text = "洗濯日和です。";
        }elseif ($weather == "Clouds"){
            $condition_text = "洗濯物が乾くのに少し時間がかかるかも知れません。";
        }elseif ($weather == "Snow"){
            $condition_text = "室内干しを検討しましょう。";
        }elseif ($weather == "Rain"){
            $condition_text = "室内干しにしましょう。";
        }elseif ($weather == "Drizzle"){
            $condition_text = "室内干しにしましょう。";
        }elseif ($weather == "Thunderstorm"){
            $condition_text = "室内干しにしましょう。";
        }else{
            $condition_text = "室内干しを検討しましょう。";
        }
        return $condition_text;
   }
   
   # 風速から洗濯物を外干ししても飛ばないか判定
   public function wind_condition($weather)
   {
    $convert_wind = (float) $weather;
    $condition_text = "";
    if ($convert_wind >= 7.0){
        $condition_text = "風が強いです。室内干しを検討しましょう。";
    }elseif ($convert_wind >= 4.0){
        $condition_text = "少し風が強いです。洗濯物が飛ばないように気を付けましょう。";
    }elseif ($convert_wind >= 1.6){
        $condition_text = "心地いい風です。";
    }elseif ($convert_wind < 1.6){
        $condition_text = "風は殆どありません。";
    }
    return $condition_text;
   }
   # 洗濯指数を計算する関数
   public function laundry_exponent($temp, $humidity)
   {
        $calc = round((0.81 * (float) $temp + 0.01 * (float) $humidity * (0.99 * (float) $temp - 14.3) + 46.3), 3);
        return $calc;
   }
   # 洗濯のおすすめ度を計算する関数
   public function laundry_recommendation($weather, $exponent)
   {
        $num = (int) $exponent;
        $recommendation_text = "";
        $recommendation_value = "";
        
        if ($num >= 70){
            if ($weather === "Clear"){
                $recommendation_text = "最高の洗濯日和です!!!";
                $recommendation_value = "5";
            }
            elseif ($weather === "Cloud"){
                $recommendation_text = "天気の割に、洗濯物は乾きやすいです";
                $recommendation_value = "4";
            }
            else{
                $recommendation_text = "室内干しをするなら...";
                $recommendation_value = "2";
            }
        }elseif ($num >= 50){
            if ($weather === "Clear"){
                $recommendation_text = "洗濯日和です!!!";
                $recommendation_value = "4";
            }
            elseif ($weather === "Cloud"){
                $recommendation_text = "天気の割に、洗濯物は乾きやすいです";
                $recommendation_value = "2";
            }
            else{
                $recommendation_text = "室内干しをするなら...";
                $recommendation_value = "2";
            }
        } elseif ($num < 50){
            if ($weather === "Clear"){
                $recommendation_text = "洗濯日和です!!!";
                $recommendation_value = "4";
            }
            elseif ($weather === "Cloud"){
                $recommendation_text = "洗濯物は乾きにくいです。室内干しの検討も...";
                $recommendation_value = "2";
            }
            else{
                $recommendation_text = "室内干しをするなら...";
                $recommendation_value = "1";
            }
        } 
        return (["おすすめ度" => $recommendation_value, "コメント" => $recommendation_text]);
   }

}
