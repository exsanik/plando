<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController extends Controller
{
    public function index(Request $request, Response $response)
    {
        $response->getBody()->write('<a href="/hello/world">Try /hello/world</a>');
        return $response->withStatus(201);
    }
}
