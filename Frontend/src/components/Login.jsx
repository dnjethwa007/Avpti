import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Signup from "./Signup";

function Login({ onLoginSuccess }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [backendError, setBackendError] = useState(""); // State for backend error

    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = location.pathname;

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        try {
            const response = await axios.post("http://localhost:4001/user/login", userInfo);
            
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                toast.success("Logged in Successfully");
                document.getElementById("my_modal_3").close();
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token); // Save the token in local storage
                onLoginSuccess(); // Notify parent component of successful login
                setTimeout(() => {
                    navigate(currentLocation || "/");
                }, 1000);
            } else {
                console.error('Login failed with status:', response.status);
                toast.error('Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || "Login failed";
            setBackendError(errorMessage); // Update local state with error message
            toast.error(errorMessage); // Show error message in toast
        }
    };

    const openSignupModal = () => {
        document.getElementById("my_modal_3").close();
        document.getElementById("signup_modal").showModal();
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("my_modal_3").close()}
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">Login</h3>

                        {/* Email */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-80 px-3 py-1 border rounded-md outline-none bg-white"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-80 px-3 py-1 border rounded-md outline-none bg-white"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Backend Error */}
                        {backendError && (
                            <div className="mt-4 text-sm text-red-500">{backendError}</div>
                        )}

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <button type="button" className="btn btn-secondary" onClick={openSignupModal}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <Signup />
        </div>
    );
}

export default Login;
