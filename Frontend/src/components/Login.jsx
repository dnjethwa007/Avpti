import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Signup from "./Signup";

function Login() {
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
            const res = await axios.post("http://localhost:4001/user/login", userInfo);
            if (res.data) {
                toast.success("Logged in Successfully");
                document.getElementById("my_modal_3").close();
                localStorage.setItem("Users", JSON.stringify(res.data.user));
                setTimeout(() => {
                    navigate(currentLocation || "/");
                }, 1000);
            }
        } catch (err) {
            // Extract error message from response and set it in state
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
                                className="w-80 px-3 py-1 border rounded-md outline-none"
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
                                className="w-80 px-3 py-1 border rounded-md outline-none"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Backend Error */}
                        {backendError && (
                            <div className="mt-4 text-sm text-red-500">
                                {backendError}
                            </div>
                        )}

                        {/* Button */}
                        <div className="flex justify-around mt-6">
                            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                Login
                            </button>
                            <p>
                                Not registered?{" "}
                                <span
                                    className="underline text-blue-500 cursor-pointer"
                                    onClick={openSignupModal}
                                >
                                    Signup
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
            <Signup />
        </div>
    );
}

export default Login;
