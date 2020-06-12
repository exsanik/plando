<?php

date_default_timezone_set('Europe/Kiev');
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use DI\Container;
use \Illuminate\Database\Capsule\Manager;
// use Slim\Csrf\Guard;
use Slim\Http\Cookies;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Routing\RouteContext;
use Tuupola\Middleware\JwtAuthentication;


use \Respect\Validation\Factory as RespectFactory;


$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();


$container = new Container();


AppFactory::setContainer($container);
$app = AppFactory::create();

// $responseFactory = $app->getResponseFactory();

// Register Middleware On Container
// $container->set('csrf', function () use ($responseFactory) {
//     return new Guard($responseFactory);
// });

// Register Middleware To Be Executed On All Routes
// $app->add('csrf');


// Add error middleware
$app->addErrorMiddleware(true, true, true);

$app->addBodyParsingMiddleware();


// This middleware will append the response header Access-Control-Allow-Methods with all allowed methods
$app->add(function (Request $request, RequestHandlerInterface $handler): Response {
    error_log("PLS");
    $routeContext = RouteContext::fromRequest($request);
    $routingResults = $routeContext->getRoutingResults();
    $methods = $routingResults->getAllowedMethods();
    $requestHeaders = $request->getHeaderLine('Access-Control-Request-Headers');

    $response = $handler->handle($request);

    $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');
    $response = $response->withHeader('Access-Control-Allow-Origin', getenv('FRONTEND_URL'));
    $response = $response->withHeader('Access-Control-Allow-Methods', implode(',', $methods));
    $response = $response->withHeader('Access-Control-Allow-Headers', $requestHeaders ? $requestHeaders : '*');

    // Optional: Allow Ajax CORS requests with Authorization header
    $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');

    return $response;
});

$app->add(new JwtAuthentication([
    "path" => ["/api"],
    "ignore" => ["/api/log-in", "/api/sign-up", "/api/refresh-token"],
    "secret" => getenv('JWT_SECRET'),
    "error" => function ($response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

// The RoutingMiddleware should be added after our CORS middleware so routing is performed first
$app->addRoutingMiddleware();


$container->set('dbSettings', [
    'driver' => 'mysql',
    'host' => getenv('DB_HOST'),
    'database' => getenv('DB_NAME'),
    'username' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix' => ''
]);

$capsule = new Manager;
$capsule->addConnection($container->get('dbSettings'));
$capsule->setAsGlobal();
$capsule->bootEloquent();

$container->set('db', function ($container) use ($capsule) {
    return $capsule;
});

$container->set('UserController', function ($container) {
    return new \App\Controllers\UserController($container);
});

$container->set('TodoController', function ($container) {
    return new \App\Controllers\TodoController($container);
});

$container->set('validator', function ($container) {
    return new App\Validation\Validator;
});

$container->set('auth', function ($container) {
    return new App\Auth\Auth;
});

RespectFactory::setDefaultInstance(
    (new RespectFactory())
        ->withRuleNamespace('App\\Validation\\Rules')
        ->withExceptionNamespace('App\\Validation\\Exceptions')
);


require __DIR__ . '/routes.php';
