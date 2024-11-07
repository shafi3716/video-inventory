/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-04 00:44:47
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:29:56
 */
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

const Register = () => {
    const auth = useAuth();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;

        const payload = {
            username,
            password,
            role,
        };

        api.post("/auth/register", payload)
            .then((response) => {
                console.log(response.data);
                LocalStorageService.setToken(response.data.token);
                const token = LocalStorageService.getTokenInfo(
                    response.data.token
                );
                auth?.setIsAuthenticated(true);
                toast.success("Registration successfully");
                if (token?.roles[0] === "ROLE_ADMIN") {
                    return <Navigate to='/admin' replace />;
                } else if (token?.roles[0] === "ROLE_USER") {
                    return <Navigate to='/user' replace />;
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
                toast.error(
                    "There was an error! " + error?.response?.data?.message
                );
            });
    };

    const roles = [
        {
            value: "ROLE_ADMIN",
            name: "Admin",
        },
        {
            value: "ROLE_USER",
            name: "User",
        },
    ];

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center'>Registration</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='username'
                            className='block mb-2 text-sm font-medium text-gray-700'
                        >
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                            placeholder='Enter your username'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-gray-700'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            min={6}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                            placeholder='Enter your password'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='role'
                            className='block mb-2 text-sm font-medium text-gray-700'
                        >
                            Role
                        </label>
                        <select
                            id='role'
                            name='role'
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-indigo-200'
                        >
                            <option value='' disabled>
                                Select a user
                            </option>
                            {roles?.map((user: any) => (
                                <option key={user.value} value={user.value}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
                    >
                        Register
                    </button>
                    <a href='/' className='flex justify-end text-blue-500'>
                        Go to login
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Register;
