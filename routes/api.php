<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Radiis\AwardController;
use App\Http\Controllers\Api\Radiis\ProgramController;
use App\Http\Controllers\Api\Radiis\ProjectController;
use App\Http\Controllers\Api\Radiis\PublicationController;
use App\Http\Controllers\Api\Radiis\PresentationController;
use App\Http\Controllers\Api\Radiis\StudyController;
use App\Http\Controllers\Api\Radiis\IPRightController;
use App\Http\Controllers\Api\Radiis\LinkagesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
    Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::apiResource('/users', \App\Http\Controllers\Api\UserController::class);
    Route::get('/rdprogram', [ProgramController::class, 'index']);
    Route::get('/rdproject', [ProjectController::class, 'index']);
    Route::get('/rdstudy', [StudyController::class, 'index']);
    Route::get('/rdpublication', [PublicationController::class, 'index']); 
    Route::get('/rdpresentation', [PresentationController::class, 'index']);
    Route::get('/rdipright', [IPRightController::class, 'index']);
    Route::get('/rdaward', [AwardController::class, 'index']);
    Route::get('/rdlinkage', [LinkagesController::class, 'index']);
});

Route::post('/signup', [\App\Http\Controllers\Api\AuthController::class, 'signup']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

