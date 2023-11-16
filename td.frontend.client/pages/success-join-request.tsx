import React from 'react';

const Success: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-white">Success!</h1>
      <p className="mt-4 text-lg text-gray-300">
        We have successfully received your request to be a part of TestDriveLive. Our team will review your submission and get back to you shortly. Thank you for your interest in our platform.
      </p>
    </div>
  );
};

export default Success;
