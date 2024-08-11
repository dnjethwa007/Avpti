import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "./storeContext"; // Import the API endpoints

function Signup() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm();

  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const handleSendOtp = async (data) => {
    const { email } = data;

    try {
      console.log("Sending OTP to:", email); // Log email for debugging
      await axios.post(API_ENDPOINTS.SEND_OTP, { email }); // Use the endpoint from storeContext
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
      await axios.post(API_ENDPOINTS.VERIFY_OTP, userInfo); // Use the endpoint from storeContext
      toast.success("Registration Successful");
      document.getElementById("signup_modal").close();
      setTimeout(() => {
        document.getElementById("complete_registration_modal").showModal();
      }, 1000);
      reset(); // Clear the form fields
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
    <>
      <dialog id="signup_modal" className="modal">
        <div className="modal-box relative">
          {/* Close Icon */}
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
            onClick={() => document.getElementById("signup_modal").close()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
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
                      required: "This field is required",
                      validate: value =>
                        value === watchPassword || "Passwords do not match"
                    })}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                  )}
                </div>

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

      {/* Complete Registration Modal */}
      <dialog id="complete_registration_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Registration Successful</h3>
          <p className="py-4">Please check your email to verify your account.</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200"
              onClick={() => document.getElementById("complete_registration_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Signup;
