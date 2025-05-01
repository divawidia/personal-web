<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Sitemap\SitemapGenerator;

class SitemapController extends Controller
{
    public function generateSitemap()
    {
        SitemapGenerator::create('https://divawidia.my.id')->writeToFile(public_path('sitemap.xml'));
    }
}
