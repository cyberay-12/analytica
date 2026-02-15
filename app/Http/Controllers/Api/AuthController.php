<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(Request $request) 
{
    $credentials = $request->validate([
        'email' => 'required|email|exists:users,email',
        'password' => 'required'
    ]);

    if (!Auth::attempt($credentials)) {
        return response([
            'message' => 'The provided credentials are incorrect'
        ], 422);
    }

    /** @var \App\Models\User $user */
    $user = Auth::user();
    
    // Create a token (Assuming you are using Laravel Sanctum)
    $token = $user->createToken('main')->plainTextToken;

    // THIS IS THE KEY PART: Returning the exact keys your React code expects
    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}