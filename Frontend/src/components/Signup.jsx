import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();

  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const handleSendOtp = async (data) => {
    const { email } = data;

    try {
      console.log("Sending OTP to:", email); // Log email for debugging
      await axios.post("http://localhost:4001/user/send-otp", { email });
      toast.success("OTP sent to your email");
      console.log("OTP sent successfully"); // Log success message
      setIsOtpSent(true);
      setBackendError(null); // Clear any previous error
    } catch (err) {
      console.error("Error sending OTP:", err); // Log error details
      setBackendError(err.response?.data?.error || "Unknown error");
    }
  };

  const handleSignUp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userInfo = {
      firstName: data.firstName.trim(), // Trim to remove extra spaces
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      otp: data.otp.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    try {
      await axios.post("http://localhost:4001/user/verify-otp", userInfo);
      toast.success("Registration Successful");
      document.getElementById("signup_modal").close();
      setTimeout(() => {
        document.getElementById("my_modal_3").showModal();
      }, 1000);
      setBackendError(null); // Clear any previous error
    } catch (err) {
      console.error("Error during registration:", err);
      const errorMsg = err.response?.data?.error || "Unknown error";
      setBackendError(errorMsg); // Set backend error to display
    }
  };

  const handleFormSubmit = (data) => {
    if (!isOtpSent) {
      handleSendOtp(data);
    } else {
      handleSignUp(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value.trim(), { shouldValidate: true }); // Automatically trim the input value
  };

  return (
    <dialog id="signup_modal" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h3 className="font-bold text-lg mb-4">
            {isOtpSent ? "Complete Registration" : "Sign Up"}
          </h3>

          {backendError && (
            <div className="text-sm text-red-500 mb-4">
              {backendError}
            </div>
          )}

          {!isOtpSent ? (
            <>
              {/* First Name */}
              <div className="mt-4 space-y-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("firstName", { 
                    required: "This field is required",
                  })}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">{errors.firstName.message}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="mt-4 space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">{errors.lastName.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
              </div>

              {/* Send OTP Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200"
                >
                  Send OTP
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP */}
              <div className="mt-4 space-y-2">
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("otp", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{6}$/, // Validate 6-digit OTP
                      message: "Enter a valid 6-digit OTP"
                    }
                  })}
                  onChange={handleInputChange}
                />
                {errors.otp && (
                  <span className="text-sm text-red-500">{errors.otp.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("password", { 
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z][a-z0-9]*$/, // First letter uppercase, rest can be lowercase letters or digits
                      message: "Password must start with an uppercase letter, followed by lowercase letters or digits"
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    maxLength: {
                      value: 10,
                      message: "Password must be no more than 10 characters long"
                    }
                  })}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
              </div>
 

              {/* Confirm Password */}
              <div className="mt-4 space-y-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none"
                  autoComplete="off"
                  {...register("confirmPassword", { 
                    required: "This field is required"
                  })}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                )}
              </div>

              {/* Password Mismatch Error */}
              {watchPassword !== watchConfirmPassword && isOtpSent && (
                <span className="text-sm text-red-500 mt-2">Passwords do not match</span>
              )}

              {/* Sign Up Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </dialog>
  );
}

export default Signup;