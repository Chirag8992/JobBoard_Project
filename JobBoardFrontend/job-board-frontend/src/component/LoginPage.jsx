import { useState } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import api from './api'

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', formData);
            localStorage.setItem('token', res.data.token);


            if (res.status == 200 && res.data.role === 'Employee') {
                navigate('/employee')
            }
            else if (res.status == 200 && res.data.role === 'JobSeeker') {
                navigate('/JobSeeker')
            }



            console.log('Login successful', res.data);
        } catch (error) {
            console.error('Login error', error);
        }
    };





    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md min-h-[400px]"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign In to JobHub</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"

                >
                    Sign In
                </button>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/SignupPage" className="text-blue-600 hover:underline">
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
