import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStore } from "./storeContext"; // Import useStore

function ForgotPassword({ onResetSuccess }) {
    const { API_ENDPOINTS } = useStore(); // Access API endpoints from context
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLinkSent, setIsLinkSent] = useState(false);
    const [backendError, setBackendError] = useState(null);
    const navigate = useNavigate();

    const handleSendResetLink = async (data) => {
        const { email } = data;

        try {
            await axios.post(API_ENDPOINTS.SEND_RESET_LINK, { email });
            toast.success("Reset link sent to your email");
            setIsLinkSent(true);
            setBackendError(null);
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Error sending reset link";
            setBackendError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const handleResetPassword = async (data) => {
        const { email, otp, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(API_ENDPOINTS.RESET_PASSWORD, { email, otp, newPassword });
            toast.success("Password reset successful");
            setBackendError(null);

            if (onResetSuccess) onResetSuccess();

            const modal = document.getElementById("forgot_password_modal");
            if (modal) {
                modal.close();
                setTimeout(() => {
                    document.getElementById("my_modal_3")?.showModal();
                }, 1000);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Error resetting password";
            setBackendError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const onSubmit = (data) => {
        if (!isLinkSent) {
            handleSendResetLink(data);
        } else {
            handleResetPassword(data);
        }
    };

    const handleCancel = () => {
        const modal = document.getElementById("forgot_password_modal");
        if (modal) modal.close();
        navigate("/");
    };

    return (
        <div className="modal-box">
            <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleCancel}
            >
                ✕
            </button>
            <h3 className="font-bold text-lg">
                {isLinkSent ? "Reset Password" : "Forgot Password"}
            </h3>

            {backendError && (
                <div className="text-sm text-red-500 mb-4">{backendError}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                {!isLinkSent ? (
                    <>
                        <div className="mt-4">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="btn btn-primary">Send Reset Link</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mt-4">
                            <label htmlFor="otp">Reset OTP</label>
                            <input
                                id="otp"
                                type="text"
                                placeholder="Enter reset OTP"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                {...register("otp", { required: "OTP is required" })}
                            />
                            {errors.otp && (
                                <span className="text-sm text-red-500">{errors.otp.message}</span>
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                {...register("newPassword", { required: "New password is required" })}
                            />
                            {errors.newPassword && (
                                <span className="text-sm text-red-500">{errors.newPassword.message}</span>
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                {...register("confirmPassword", { required: "Confirm password is required" })}
                            />
                            {errors.confirmPassword && (
                                <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="btn btn-primary">Reset Password</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default ForgotPassword;
