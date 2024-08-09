Sử dụng lệnh sau để đặt lại tất cả các thay đổi chưa commit trên branch hiện tại về trạng thái cuối cùng của commit cuối cùng:
git reset --hard HEAD


Sau khi reset, bạn có thể lấy code mới nhất từ remote repository bằng cách sử dụng lệnh sau:

git fetch origin
git checkout main
git reset --hard origin/main