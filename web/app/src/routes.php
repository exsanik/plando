<?php

use \Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// User
$app->post('/api/sign-up', 'UserController:postSignUp');
$app->post('/api/log-in', 'UserController:postLogIn');
$app->get('/api/log-out', 'UserController:getLogOut');
$app->get('/api/refresh-token', 'UserController:getTokens');

// Todos
$app->get('/api/todos', 'TodoController:getTodos');
$app->delete('/api/todo/{id}', 'TodoController:deleteTodo');
$app->post('/api/todo', 'TodoController:createTodo');
$app->patch('/api/todo/{id}', 'TodoController:patchTodo');
