<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshTokens extends Model
{
    protected $table = 'refresh_tokens';

    protected $fillable = [
        'user_id',
        'refresh_token',
        'expiration'
    ];
}
