<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::get('/generate-sitemap', [SitemapController::class, 'generateSitemap']);