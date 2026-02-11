<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Radiis\ProgramController;
use App\Http\Controllers\Api\Radiis\ProjectController;
use App\Http\Controllers\Api\Radiis\PublicationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::apiResource('/users', \App\Http\Controllers\Api\UserController::class);
    Route::get('/rdprogram', [ProgramController::class, 'index']);
    Route::get('/rdproject', [ProjectController::class, 'index']);
    Route::get('/rdpublication', [PublicationController::class, 'index']);
});

Route::post('/signup', [\App\Http\Controllers\Api\AuthController::class, 'signup']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

