<?php

namespace App\Exceptions;

use App\Http\Responses\ApiResponse;
use Exception;

class OrderNotFoundException extends Exception
{
    public function render($request)
    {
        return ApiResponse::error('Order not found', 404);
    }
}
