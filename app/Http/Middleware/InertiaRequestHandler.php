<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InertiaRequestHandler extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => function () {
                return [
                    'user' => auth()->check() ? auth()->user()->only('id', 'username', 'usertype') : null,
                ];
            },
        ]);
    }
}
