import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props; // Get logged-in user data

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="mt-2 text-gray-600">You are now on the dashboard.</p>
        </div>
    );
}

