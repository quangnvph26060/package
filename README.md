User

1. User/ random password
2. User/ check key $data  user update info


////////////////////////////////////////////////////

Address
hack tỉnh huyện xã 


3. validate bên fe thư mục validate_FE

4. laravel demo code theo  nguyên tắc service in laravel 
Services là nơi xử lý các logic sau đó sẽ trả ra json hoặc blade bên controller sẽ gọi 
hàm từ services qua 


5. viewComposer lại nơi khai báo các biến có thể sử dụng các biến đó ở mọi các blade in laravel
cách thức hoạt động là tạo 1 file VierwComposer.php sau đó 
import vào Provides/AppServiceProvider.php 
=>  public function boot()
    {
        View::composer('*', UserComposer::class);
    }
    
6. server 
1.config apache

2.config nginx

3.Khởi động lại dịch vụ


7. cron job 
Link tham khảo: https://viblo.asia/p/tim-hieu-tao-cron-job-trong-laravel-63vKjaYM52R

8. supervisord
Link tham khảo: https://viblo.asia/p/cau-hinh-supervisor-de-chay-laravel-queue-tren-linux-RQqKLoGN57z



9. html/website-fruitables 
giao diện trang chủ  html 


10. product
các function  in controller

