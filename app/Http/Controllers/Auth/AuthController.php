<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return redirect('login');
    }
}
