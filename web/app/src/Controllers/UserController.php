<?php

namespace App\Controllers;

use \Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Dflydev\FigCookies\FigRequestCookies;
use Dflydev\FigCookies\FigResponseCookies;
use Dflydev\FigCookies\SetCookie;

use App\Models\User;
use App\Models\RefreshTokens;

use \Respect\Validation\Validator as v;

class UserController extends Controller
{
    public function postSignUp(Request $request, Response $response)
    {
        $body = $request->getParsedBody();

        $validation = $this->validator->validate($request, [
            'email' => v::noWhitespace()->notEmpty()->email()->emailAvailable(),
            'name' => v::notEmpty()->alpha(),
            'password' => v::noWhitespace()->notEmpty(),
        ]);

        if ($validation->failed()) {
            return $response->withJson($validation->errors)->withStatus(422);
        }

        $hpassword = password_hash($body['password'], PASSWORD_DEFAULT);
        $user = User::create([
            'email' => $body['email'],
            'name' => $body['name'],
            'password' => $hpassword
        ]);

        $result = $this->auth->authenticate($body['email'], $body['password']);
        if ($result['auth']) {

            $token =  $this->auth->generateAccessToken($this->auth->user);

            $refreshToken = $this->auth->generateRefreshToken();
            $response = $this->auth->refreshTokenCookieFromResponse($refreshToken, $response);

            RefreshTokens::create([
                'user_id' => $this->auth->user->id,
                'refresh_token' => $refreshToken['refresh_token'],
            ]);

            return  $response->withStatus(201)->withJson(['token' => $token]);
        } else {
            return $response->withStatus(401)->withJson($result);
        }
    }

    public function postLogIn(Request $request, Response $response)
    {
        $body = $request->getParsedBody();

        $result = $this->auth->authenticate($body['email'], $body['password']);
        if ($result['auth']) {

            $result['access_token'] = $this->auth->generateAccessToken($this->auth->user);
            $response = $response->withStatus(200)->withJson($result);

            $refreshToken = $this->auth->generateRefreshToken();
            $response = $this->auth->refreshTokenCookieFromResponse($refreshToken, $response);

            RefreshTokens::create([
                'user_id' => $this->auth->user->id,
                'refresh_token' => $refreshToken['refresh_token'],
            ]);

            return $response;
        } else {
            return $response->withStatus(403)->withJson($result);
        }
    }

    public function getLogOut(Request $request, Response $response)
    {
        $cookie = FigRequestCookies::get($request, 'refresh_token');
        $decoded = $request->getAttribute("token");

        RefreshTokens::where(['user_id' => $decoded["user_id"], 'refresh_token' => $cookie->getValue()])->delete();

        $response = FigResponseCookies::set($response,  SetCookie::create('refresh_token')
            ->withExpires('01-01-1970')
            ->withDomain(getenv('FRONTEND_COOKIE'))
            ->withPath('/'));

        return  $response;
    }

    public function getTokens(Request $request, Response $response)
    {
        $cookie = FigRequestCookies::get($request, 'refresh_token');

        $tokenQuery = RefreshTokens::where('refresh_token', $cookie->getValue())->first();

        if (!$tokenQuery) {
            return  $response->withStatus(401);
        }
        $user = User::where('id', $tokenQuery['user_id'])->first();

        $accessToken = $this->auth->generateAccessToken($user);
        $response = $response->withStatus(200)->withJson(['access_token' =>  $accessToken]);

        $refreshToken = $this->auth->generateRefreshToken();
        $response = $this->auth->refreshTokenCookieFromResponse($refreshToken, $response);

        RefreshTokens::where('refresh_token',  $cookie->getValue())->update([
            'refresh_token' => $refreshToken['refresh_token'],
        ]);

        return  $response;
    }
}
