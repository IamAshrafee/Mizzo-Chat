import React, { useState } from "react";
import RegistrationBanner from "../../assets/images/RegistrationBanner.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Registration = () => {

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="w-[50%] h-full flex flex-col justify-center max-w-[50%] pl-[40px] items-center">
        <div>
          <h1 className="font-nunito text-[34px] font-bold text-[#11175D]">
            Get started with easily register
          </h1>
          <p className="font-nunito text-[20px] font-[400] text-primary-opacity">
            Free register and you can enjoy it
          </p>

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
                      type="text"
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
                      type="text"
                      id="username-error"
                      class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-[8px] focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                      placeholder="example@gmail.com"
                    />
                  </div>
                )}

                <p class="mt-2 text-sm text-red-600">{emailError}</p>
              </div>
              <div className="mb-5">
                {!nameError ? (
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block mb-2 text-sm font-medium text-[#11175D] "
                    >
                      Full name
                    </label>
                    <input
                      onChange={handleName}
                      type="text"
                      id="fullname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block mb-2 text-sm font-medium text-red-700"
                    >
                      Full name
                    </label>
                    <input
                      onChange={handleName}
                      type="text"
                      id="fullname"
                      class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-[8px] focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                      placeholder="John doe"
                    />
                  </div>
                )}

                <p class="mt-2 text-sm text-red-600">{nameError}</p>
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
                    <div className="relative">
                      <input
                        onChange={handlePassword}
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
                onClick={handleRegistration}
                type="submit"
                className="mt-[20px] w-full py-[20px] rounded-[70px] text-white font-nunito font-[600] text-[18px] bg-black cursor-pointer hover:bg-[#16115d] transition duration-300"
              >
                Sign up
              </button>
              <div className="mt-[30px] w-full items-center flex justify-center">
                <p className="font-nunito text-[16px] text-[#11175D]">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-yellow-500 font-bold">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] flex items-center justify-center max-w-[50%]">
        <img
          src={RegistrationBanner}
          alt="Registration Banner"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
