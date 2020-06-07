<?php

namespace App\Auth;

use \Firebase\JWT\JWT;
use \Datetime;

use Dflydev\FigCookies\FigResponseCookies;
use Dflydev\FigCookies\SetCookie;

use App\Models\User;

class Auth
{
    private $user = null;
    public function authenticate($email, $password)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return ['auth' => false, 'message' => "User does not exists!"];
        }

        $isCorrectPassword = password_verify($password, $user->password);
        if ($isCorrectPassword) {
            $this->user = $user;
            return ['auth' => true, 'message' => "Success!"];
        } else {
            return ['auth' => false, 'message' => "Password is incorrect!"];
        }
    }

    public function generateAccessToken($user)
    {
        $now = new DateTime();
        $future = new DateTime("now +15 minutes");
        $jti = uniqid();

        $secret = getenv("JWT_SECRET");

        $payload = [
            "jti" => $jti,
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "user_id" => $user->id,
            "user_name" => $user->name,
            "user_email" => $user->email
        ];

        $token = JWT::encode($payload, $secret, "HS256");
        return $token;
    }

    public function generateRefreshToken()
    {
        $refreshToken = uniqid("", true);
        $expiration = new DateTime("now +2 weeks");
        return ['refresh_token' => $refreshToken, 'expiration' => $expiration];
    }

    public function refreshTokenCookieFromResponse($refreshToken, $response)
    {
        return FigResponseCookies::set($response, SetCookie::create('refresh_token')
            ->withValue($refreshToken['refresh_token'])
            ->withDomain(getenv('FRONTEND_COOKIE'))
            ->withPath('/')
            ->withExpires($refreshToken['expiration'])
            ->withHttpOnly());
    }

    public function __get($property)
    {
        return $this->$property;
    }
}
