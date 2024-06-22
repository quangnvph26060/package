use App\Exceptions\OrderNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;


public function orderCount()
    {
        try {
            $orderCount = $this->orderService->orderCount();
            return ApiResponse::success($orderCount, 'success', 200);
        } 
        catch (ModelNotFoundException $e) {
            $exception = new OrderNotFoundException();
            return $exception->render(request());
        }
        catch (\Exception $e) {
            Log::error('Failed to order count: ' . $e->getMessage());
            return ApiResponse::error('Failed order count', 500);
        }
    }

        /**
            function mẫu dùng Exception và ApiResponse 
        */