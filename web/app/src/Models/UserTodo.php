<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTodo extends Model
{
    protected $table = 'todo_user';

    protected $fillable = [
        'user_id',
        'todo_id',
    ];
}
