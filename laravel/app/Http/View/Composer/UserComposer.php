<?php
namespace App\Http\View\Composers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request; 
use Illuminate\Support\Facades\Session; 
class UserComposer
{
    public function compose(View $view)
    {
        $request = Request::instance();
        if ($request->session()->has('authUser')) {
            $result = $request->session()->get('authUser');
            if (is_array($result)) {
                $view->with('loggedInUser', [
                    'name'     => $result['user']['name'],
                    'email'    => $result['user']['email'],
                    'images'   => $result['user']['user_info'][0]['img_url'],
                ]);
                
            }
        } else {
            $view->with('loggedInUser', null);
        }
    }
}

?>