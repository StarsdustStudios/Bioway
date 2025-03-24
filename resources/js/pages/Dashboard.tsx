import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link href="/logout" method="post" as="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </Link>
        </div>
    );
}
