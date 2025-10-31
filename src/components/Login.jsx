import { useState } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice"; // ✅ correct action
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  // ✅ Setup reCAPTCHA only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            setMessage("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  };

  // ✅ Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      return setMessage("Please enter a valid 10-digit phone number");
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        appVerifier
      );
      setConfirmationResult(result);
      setMessage("✅ OTP sent successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP: " + error.message);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !confirmationResult) return setMessage("Enter a valid OTP");

    try {
      const userCred = await confirmationResult.confirm(otp);
      const user = {
        phone: userCred.user.phoneNumber,
        uid: userCred.user.uid,
      };
      dispatch(login(user)); // ✅ corrected action name
      setMessage("✅ Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("❌ Invalid OTP, please try again");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      ></div>

      <div className="relative bg-white text-gray-800 rounded-2xl shadow-lg w-96 p-6 z-50 border-t-4 border-green-500">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Login with OTP
        </h2>

        {!confirmationResult ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter phone number"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              message.includes("Error") || message.includes("Invalid")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div id="recaptcha-container"></div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Login;
