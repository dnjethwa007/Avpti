import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component

function Login({ onLoginSuccess }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [backendError, setBackendError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = location.pathname;

    const onSubmit = async (data) => {
        const userInfo = { email: data.email, password: data.password };

        try {
            const response = await axios.post("http://localhost:4001/user/login", userInfo);
            
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                toast.success("Logged in Successfully");
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                
                // Close the modal and trigger the success handler
                const modal = document.getElementById("my_modal_3");
                if (modal) modal.close();
                
                onLoginSuccess(); // Trigger login success callback
                
                // Refresh the page
                window.location.reload();
            } else {
                console.error('Login failed with status:', response.status);
                toast.error('Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || "Login failed";
            setBackendError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();
        navigate("/"); // Redirect to the home page
    };

    const openSignupModal = () => {
        const loginModal = document.getElementById("my_modal_3");
        const signupModal = document.getElementById("signup_modal");
        if (loginModal) loginModal.close();
        if (signupModal) signupModal.showModal();
    };

    const openForgotPasswordModal = () => {
        const loginModal = document.getElementById("my_modal_3");
        const forgotPasswordModal = document.getElementById("forgot_password_modal");

        if (loginModal) loginModal.close(); // Close the login modal
        if (forgotPasswordModal) forgotPasswordModal.showModal(); // Open the forgot password modal
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCancel} // Use handleCancel for the cancel button
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">Login</h3>

                        {/* Email */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="login-email"
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
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="login-password"
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
                            <button type="button" className="btn btn-link" onClick={openForgotPasswordModal}>Forgot Password?</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <dialog id="forgot_password_modal" className="modal">
                <ForgotPassword />
            </dialog>

            <Signup />
        </div>
    );
}

export default Login;
