<?php

namespace App\Controllers;

use \Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\User;
use App\Models\RefreshTokens;
use App\Models\Todos;
use App\Models\UserTodo;

use \Respect\Validation\Validator as v;

class TodoController extends Controller
{
    public function getTodos(Request $request, Response $response)
    {
        $decoded = $request->getAttribute("token");
        $user_id = $decoded["user_id"];
        $todos = UserTodo::select('*')->join('todos', 'todos.id', '=', 'todo_user.todo_id')->where('todo_user.user_id', $user_id)->get();
        foreach ($todos as &$todo) {
            $todo["assigned_users"] = array_filter(array_map(function ($id) {
                return User::where('id', $id)->first()["email"];
            }, json_decode($todo["assigned_users"])));
            $todo["user_email"] = User::where('id', $user_id)->first()["email"];
        }
        return $response->withJson($todos);
    }

    public function createTodo(Request $request, Response $response)
    {
        $body = $request->getParsedBody();

        $decoded = $request->getAttribute("token");
        $user_id = $decoded["user_id"];

        $emailsToId = array_filter(array_map(function ($email) {
            return User::where('email', $email)->first()["id"];
        }, $body["assigned"]));


        $validation = $this->validator->validate($request, [
            'title' => v::notEmpty(),
        ]);
        if ($validation->failed()) {
            return $response->withJson($validation->errors)->withStatus(422);
        }

        $todo = Todos::create([
            "title" => $body["title"],
            "description" => $body["description"],
            "user_id" => $user_id,
            "expire_at" => $body["expire"],
            "assigned_users" => json_encode($emailsToId),
            "is_done" => false
        ]);

        foreach ($emailsToId as $id) {
            UserTodo::create(['user_id' => $id, 'todo_id' => $todo["id"]]);
        }

        return $response->withStatus(201);
    }

    public function deleteTodo(Request $request, Response $response, $args)
    {
        $decoded = $request->getAttribute("token");
        $user_id = $decoded["user_id"];
        Todos::where(['user_id' => $user_id, 'id' => $args["id"]])->delete();
        return $response;
    }

    public function patchTodo(Request $request, Response $response, $args)
    {
        $decoded = $request->getAttribute("token");
        $user_id = $decoded["user_id"];
        $isDone = Todos::where(['user_id' => $user_id, 'id' => $args["id"]])->first()["is_done"];
        if (is_null($isDone)) $isDone = false;
        Todos::where(['user_id' => $user_id, 'id' => $args["id"]])->update(['is_done' => !$isDone]);
        return $response;
    }
}
