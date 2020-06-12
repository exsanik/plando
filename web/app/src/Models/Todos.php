<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    protected $table = 'todos';

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'expire_at',
        'assigned_users',
        "is_done"
    ];
}
