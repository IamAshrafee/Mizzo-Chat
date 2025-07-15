import React, { useState, useRef } from "react";
import loginBanner from "../../assets/images/LoginBanner.jpg";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import LoadingBar from "react-top-loading-bar";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import ForgetPass from "../Popup/ForgetPass";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import  {userLogInfo}  from "../../slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const loadingBarRef = useRef(null); // Create a ref for the loading bar
  const auth = getAuth();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showForgetPass, setShowForgetPass] = useState(false);
  const handleGoogleSignIn = () => {
    loadingBarRef.current.staticStart();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info
        const user = result.user;

        console.log("Google Sign-In Successful", { user, token });
        toast.success("Google login successful");

        loadingBarRef.current.complete();
        setTimeout(() => {
          navigate("/Home");
        }, 1500);
      })
      .catch((error) => {
        // Complete loading bar on error
        loadingBarRef.current.complete();

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Google Sign-In Error", {
          errorCode,
          errorMessage,
          email,
          credential,
        });

        // Show appropriate error messages to user
        switch (errorCode) {
          case "auth/account-exists-with-different-credential":
            toast.error("An account already exists with this email");
            break;
          case "auth/popup-closed-by-user":
            toast.error("Sign in popup was closed before completing");
            break;
          case "auth/cancelled-popup-request":
            // No need to show error if user cancelled
            break;
          case "auth/popup-blocked":
            toast.error(
              "Popup was blocked by your browser. Please allow popups for this site"
            );
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Please check your internet connection");
            break;
          default:
            toast.error("Google sign in failed. Please try again");
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleLogin = () => {
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

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) {
      loadingBarRef.current.complete();
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        dispatch(userLogInfo(user))
        localStorage.setItem("userLoginInfo", JSON.stringify(user));
        setEmail("");
        setPassword("");
        toast.success("Login successful");
        setTimeout(() => {
          loadingBarRef.current.complete();
          navigate("/Home");
        }, 1800);
      })
      .catch((error) => {
        loadingBarRef.current.complete();
        switch (error.code) {
          case "auth/invalid-credential":
            setEmailError("Invalid email or password");
            setPasswordError("Invalid email or password");
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

  return (
    <div>
      <AnimatePresence>
        {showForgetPass && (
          <ForgetPass
            key="forget-pass"
            onclose={() => setShowForgetPass(false)}
          />
        )}
      </AnimatePresence>
      <LoadingBar
        color="#11175D" // You can change this color to match your theme
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="flex h-screen w-full justify-center items-center">
        <div className="w-[50%] h-full flex flex-col justify-center max-w-[50%] pl-[40px] items-center">
          <div>
            <h1 className="font-nunito text-[34px] font-bold text-[#11175D]">
              Login to your account!
            </h1>
            <p className="font-nunito text-[20px] font-[400] text-primary-opacity">
              MizoChat is just a step ahead
            </p>
            <div onClick={handleGoogleSignIn} className=" mt-[20px]">
              <a
                href="#"
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-200 group hover:shadow border border-gray-300 hover:border-gray-200"
              >
                {/* Your custom SVG */}
                <svg
                  className="h-6"
                  viewBox="0 0 150 150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Styles from <style> tag */}
                  <defs>
                    <style>{`
          .st14 { fill: #4280EF; }
          .st15 { fill: #34A353; }
          .st12 { fill: #F6B704; }
          .st13 { fill: #E54335; }
        `}</style>
                  </defs>
                  <g>
                    <path
                      className="st14"
                      d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5
            C115,101.8,120,90,120,76.1L120,76.1z"
                    />
                    <path
                      className="st15"
                      d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9
            L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z"
                    />
                    <path
                      className="st12"
                      d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z"
                    />
                    <path
                      className="st13"
                      d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3
            l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z"
                    />
                  </g>
                </svg>
                {/* Text next to SVG */}
                <span className="flex-1 ms-3 font-nunito whitespace-nowrap">
                  Login with Google
                </span>
              </a>
            </div>

            <div className="items-start mt-[35px]">
              <div className="max-w-sm">
                <div className="mb-5">
                  {!emailError ? (
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#11175D] "
                      >
                        Email Address
                      </label>
                      <input
                        onChange={handleEmail}
                        value={email}
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-red-700"
                      >
                        Email Address
                      </label>
                      <input
                        onChange={handleEmail}
                        value={email}
                        type="email"
                        id="email"
                        className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-[8px] focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                        placeholder="example@gmail.com"
                      />
                    </div>
                  )}

                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                </div>
                <div className="mb-5">
                  {!passwordError ? (
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-[#11175D]"
                      >
                        Password
                      </label>
                      <div className="relative z-0">
                        <input
                          onChange={handlePassword}
                          value={password}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter a password"
                          required
                        />
                        {showPassword ? (
                          <FaEye
                            onClick={() => setShowPassword(false)}
                            className="absolute right-4 top-[50%] transform -translate-y-1/2  cursor-pointer"
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={() => setShowPassword(true)}
                            className="absolute right-4 top-[50%] transform -translate-y-1/2  cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-red-700"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          onChange={handlePassword}
                          value={password}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-[8px] focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                          placeholder="Enter a password"
                          required
                        />
                        {showPassword ? (
                          <FaEye
                            onClick={() => setShowPassword(false)}
                            className="absolute right-4 top-[50%] transform -translate-y-1/2  cursor-pointer"
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={() => setShowPassword(true)}
                            className="absolute right-4 top-[50%] transform -translate-y-1/2  cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                </div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="mt-[20px] w-full py-[20px] rounded-[8px] text-white font-nunito font-[600] text-[18px] bg-black cursor-pointer hover:bg-[#16115d] transition duration-300"
                >
                  Login to continue
                </button>
                <div className="mt-[30px] w-full items-center flex flex-col justify-center">
                  <p
                    onClick={() => setShowForgetPass(true)}
                    className="font-nunito cursor-pointer text-sm text-[#11175D]"
                  >
                    Forgot Password?
                  </p>
                  <p className="mt-2 font-nunito text-[16px] text-[#11175D]">
                    don't have any account?{" "}
                    <Link
                      to="/Registration"
                      className="text-yellow-500 font-bold"
                    >
                      Register Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center max-w-[50%]">
          <img
            src={loginBanner}
            alt="Registration Banner"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
