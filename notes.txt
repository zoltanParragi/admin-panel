<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{ 
    function register(RegisterRequest $request) {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        
        $token = $user->createToken('main')->plainTextToken;
        
        return response(compact('user', 'token'));
    }
    
    function login(LoginRequest $request) {
        $cerdentials = $request->validated(); //email and password
        if(!Auth::attempt($cerdentials)) {
            return response([
                'message' => 'Az email és jelszó páros nem megfelelő.'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken; 

        return response(compact('user', 'token'));
    }

    function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204); // 204 - the request is successful, but there is nothing to return
    }
}
