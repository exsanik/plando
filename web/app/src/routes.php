<?php

use \Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Add routes
$app->post('/api/sign-up', 'UserController:postSignUp');
$app->post('/api/log-in', 'UserController:postLogIn');
$app->get('/api/log-out', 'UserController:getLogOut');
$app->get('/api/refresh-token', 'UserController:getTokens');


$app->get('/api/smth', function (Request $request, Response $response, $args) {
    $decoded = $request->getAttribute("token");
    return $response->withJson($decoded);
});
