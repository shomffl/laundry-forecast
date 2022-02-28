<?php

namespace App\Http\Controllers;

use App\Location;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function get()
    {
        $user_id = Auth::id();
        $user = User::find($user_id)->locations;
        return response()->json(["data" => $user]);
    }
}
