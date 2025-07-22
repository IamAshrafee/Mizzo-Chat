import React from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';

const VerifyEmailMessage = () => {
  const auth = getAuth();

  const handleResendVerificationEmail = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success('Please verify your email first!');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="mt-2 text-gray-600">
            A verification email has been sent to your email address. Please check your inbox and follow the instructions to complete your registration.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">
            Lost access of your email?
          </p>
          <button
            onClick={handleResendVerificationEmail}
            className="px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailMessage;