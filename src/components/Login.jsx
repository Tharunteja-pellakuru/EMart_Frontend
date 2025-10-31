import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ExtraMartLogo from "../assets/ExtraMart.png";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  // ✅ Initialize reCAPTCHA only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified ✅");
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please verify again.");
          },
        }
      );
    }
  };

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!phoneNumber.trim()) return alert("Please enter your phone number.");
    setLoading(true);

    try {
      setupRecaptcha(); // only once per page
      const appVerifier = window.recaptchaVerifier;

      const fullPhone = `${countryCode}${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );

      window.confirmationResult = confirmation;
      setIsOtpSent(true);
      alert("OTP sent successfully 📩");
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.code === "auth/billing-not-enabled") {
        alert(
          "Firebase billing not enabled for phone auth. Please enable Blaze plan (you won’t be charged for low usage)."
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP (Login or Signup)
  const verifyOtp = async () => {
    if (!otp.trim()) return alert("Please enter the OTP.");
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      if (isSignup) {
        alert("🎉 Signup successful!");
      } else {
        alert("🎉 Login successful!");
      }

      navigate("/");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel popup
  const handleCancel = () => navigate("/");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8">
        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6 mt-2">
          <img
            src={ExtraMartLogo}
            alt="Extra Mart Logo"
            className="w-24 sm:w-32 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-600 mb-4">
          {isSignup ? "Sign Up with OTP" : "Login with OTP"}
        </h2>

        {/* Input Section */}
        {!isOtpSent ? (
          <>
            {/* Phone Input */}
            <div className="flex gap-2 mb-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-green-500 rounded-lg px-2 py-2 text-green-700 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              {loading
                ? "Verifying..."
                : isSignup
                ? "Complete Signup"
                : "Verify OTP"}
            </button>
          </>
        )}

        {/* Toggle Login/Signup */}
        <div className="text-center mt-4">
          {isSignup ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsSignup(false);
                  setIsOtpSent(false);
                  setOtp("");
                }}
                className="text-green-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              New user?{" "}
              <button
                onClick={() => {
                  setIsSignup(true);
                  setIsOtpSent(false);
                  setOtp("");
                }}
                className="text-green-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>

        {/* reCAPTCHA placeholder */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
