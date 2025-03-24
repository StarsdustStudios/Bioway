import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        username: '',
        password: '',
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    className="border p-2 w-full"
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="border p-2 w-full mt-2"
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
                    Login
                </button>
            </form>
        </div>
    );
}
