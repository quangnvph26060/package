<?php
class password {
    public function generatePassword(): string
    {
        $length     = 6;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $password   = '';
   
        do {
            $password = '';
            for ($i = 0; $i < $length; $i++) {
                $password .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (!preg_match('/^(?=.*[0-9])(?=.*[a-zA-Z])/', $password));
   
        return $password;
    }
}

/**
 * chức năng lấy lại mật khẩu
 * random mật khẩu mới 
 */
