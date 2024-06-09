<?php
class checkKeyuser{
    protected function filterUserData(array $data): array
    {
        return array_filter($data, function ($key) {
            return in_array($key, ['name', 'email', 'address', 'phone']);
        }, ARRAY_FILTER_USE_KEY);
    }
}
/**
 *  Hàm này thực hiện chức năng check các key của $data mà bên client gửi sang để 
 * cập nhật lại thông tin user 
 * 
 *  Mục đích của phương thức này là chỉ giữ lại những dữ liệu có khóa (key)
 *  thuộc vào một tập hợp khóa cụ thể
 *
 */