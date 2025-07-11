import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

const ForgetPass = ({ onclose }) => {
  const backgroundRef = useRef();
  const auth = getAuth();
  const loadingBarRef = useRef(null); // Create a ref for the loading bar

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleResetButton = () => {
    let isValid = true;

    // Start loading bar
    loadingBarRef.current.staticStart();

    // Email validation
    if (!email) {
      setEmailError("Please enter an email address");
      isValid = false;
    } else if (email.includes(" ")) {
      setEmailError("Email should not contain spaces");
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    if (!isValid) {
      loadingBarRef.current.complete();
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset link sent to your email");
        setTimeout(() => {
          // Close the popup after a delay
          onclose();
        }, 1500);
        loadingBarRef.current.complete();
      })
      .catch((error) => {
        loadingBarRef.current.complete();
        switch (error.code) {
          case "auth/invalid-credential":
            setEmailError("Invalid email");
            toast.error("Wrong credentials, please try again");
            break;
          case "auth/too-many-requests":
            toast.error("Too many attempts. Please try again later.");
            break;
          case "auth/user-disabled":
            toast.error("This account has been disabled.");
            break;
          default:
            toast.error("An error occurred. Please try again.");
            console.log("Error Code:", error.code, "Message:", error.message);
        }
      });
  };

  const closePopup = (e) => {
    if (backgroundRef.current === e.target) {
      onclose();
    }
  };

  // Close popup when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onclose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onclose]);

  return (
    <motion.div
      key="forget-pass-modal" // Add this key
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Changed from 1 to 0 for better animation
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-[4px] text-white z-10"
    >
      <LoadingBar
        color="#11175D" // You can change this color to match your theme
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />

      <div
        ref={backgroundRef}
        onClick={closePopup}
        className="flex flex-col items-center justify-center h-full"
      >
        <motion.div
          initial={{ scale: 0.9, y: 8 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 8 }}
          transition={{ type: "spring", damping: 18 }}
          className="w-max"
        >
          <div className="flex justify-end">
            <button
              className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
              onClick={onclose}
            >
              <X />
            </button>
          </div>
          <motion.div className="bg-white h-[300px] w-[500px] mt-3 rounded-[6px] shadow-xl">
            <div className="flex flex-col items-center justify-center h-full p-4">
              <h1 className="text-2xl font-bold text-black">Forget Password</h1>
              <p className="text-gray-600 mt-2 text-center">
                Enter your email to receive a password reset link.
              </p>
              {!emailError ? (
                <div>
                  <input
                    onChange={handleEmail}
                    value={email}
                    type="email"
                    id="email"
                    className="bg-gray-50 border mt-4 w-[320px] border-gray-300 text-gray-900 text-base rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <input
                    onChange={handleEmail}
                    value={email}
                    type="email"
                    id="email"
                    className="bg-red-50 border  mt-4 w-[320px] border-red-500 text-red-900 placeholder-red-700 text-base rounded-[8px] focus:ring-red-500 focus:border-red-500 block p-2.5 "
                    placeholder="example@gmail.com"
                  />
                </div>
              )}
              <p className="mt-2 text-sm text-red-600">{emailError}</p>

              <button
                onClick={handleResetButton}
                className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-black/80 transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgetPass;
