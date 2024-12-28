"use client";
import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div className="animate-pulse text-4xl font-semibold text-purple-600"></div>
          <div className="mt-6">
            {/* CSS Spinner */}
            <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="mt-4 text-lg text-gray-500">Loading..</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex h-screen w-full bg-gray-200 text-purple-600 text-lg">Your content has loaded..!</h1>
    </div>
  );
};

export default LoadingPage;
