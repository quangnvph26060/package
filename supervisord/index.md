Cấu hình Supervisor để chạy Laravel Queue trên linux
Config: 
sudo apt-get install supervisor 
# or
sudo yum install supervisor


1. vào /etc/supervisor.d/aff-api.ini
Cấu trúc 1 file config cơ bản như sau:
Ví dụ: 
[program:aff-api] // tên program, mình thường để trùng với tên file cho dễ nhớ 
command=php /usr/share/nginx/html/affiliate/ecommerce-affiliate-api/artisan queue:work --tries=3
process_name=%(program_name)s_%(process_num)02d
autostart=true
autorestart=true
user=apache
numprocs=2
redirect_stderr=true
# Nếu có lỗi sẽ được log vào file này
stdout_logfile=/usr/share/nginx/html/affiliate/ecommerce-affiliate-api/storage/logs/laravel.log
directory=/usr/share/nginx/html/affiliate/ecommerce-affiliate-api // url dến thư mục dự án cần chạy ( run )
# Để chỉ định số giây mà tiến trình cần chạy ổn định trước khi được coi là đã khởi động thành công:
startsecs=10

Sau khi cấu hình xong ta chạy lệnh sau để restart lại supervisor
systemctl restart supervisord
# or
# Khởi động lại toàn bộ supervisor
sudo service supervisor restart

# or 
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start aff-api:*



Thư Mục Cấu Hình Chính: 
Supervisor sử dụng file cấu hình chính nằm ở /etc/supervisord.conf. File này có thể tham chiếu đến các thư mục khác chứa cấu hình cho các chương trình. Trong trường hợp của bạn, file cấu hình chính thường có một dòng như sau để bao gồm các file cấu hình khác:
[include]
files = /etc/supervisord.d/*.ini

Dòng này cho phép Supervisor tự động đọc tất cả các file .ini từ thư mục /etc/supervisord.d/.

# Lệnh kiểm tra trạng thái 
sudo supervisorctl status
# Lệnh dừng  1 queue đang hoạt động trên serve centos 
sudo supervisorctl stop queue-worker:queue-worker_00
# Sau khi dừng, bạn có thể khởi động lại bằng lệnh:
sudo supervisorctl start queue-worker

