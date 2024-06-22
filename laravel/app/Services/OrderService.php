<?php

namespace App\Services;

use App\Enums\RequestApi;
use App\Http\Responses\ApiResponse;
use App\Jobs\SendMail;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    protected $order, $orderDetail;

    public function __construct(Order $order, OrderDetail $orderDetail)
    {
        $this->order = $order;
        $this->orderDetail = $orderDetail;
    }
    public function orderCount()
    {
        try {
            $order = $this->order->where('notify', 0)->count();
            return $order;
        } catch (\Exception $e) {
            Log::error('Lỗi không lấy ra đơn hàng: ' . $e->getMessage());
            throw new Exception('Lỗi không lấy ra đơn hàng');
        }
    }
}
