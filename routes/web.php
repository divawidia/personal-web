<?php

use Illuminate\Support\Facades\Route;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::get('/generate-sitemap', [SitemapController::class, 'generateSitemap']);