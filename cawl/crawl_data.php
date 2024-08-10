<?php
// URL của trang web bạn muốn crawl
$url = 'https://tinmoi.vn/';

// Sử dụng cURL để lấy nội dung của trang web
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

// Kiểm tra xem có lỗi khi tải trang không
if ($output === false) {
    echo 'Error loading the page';
    exit;
}

// Phân tích dữ liệu từ trang web đã crawl, ví dụ lấy tiêu đề của trang
if (preg_match_all('/<a href="([^"]*)" class="line-clamp-3 mt-2">(.*?)<\/a>/', $output, $matches, PREG_SET_ORDER)) {
    foreach ($matches as $match) {
        $link = $match[1];
        $title = $match[2];
        
        echo 'Link: ' . $link . '<br>';
        echo 'Title: ' . $title . '<br><br>';
    }
} else {
    echo 'Links and titles not found';
}
?>