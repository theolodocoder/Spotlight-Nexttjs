"use client";
import React, { useState, useEffect } from "react";
import "./spinner-loader.css";

interface SpinnerLoaderProps {
  delay?: number;
  timeout?: number;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  delay = 200,
  timeout = 10000,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const spinnerTimer = setTimeout(() => setShowSpinner(true), delay);
    const timeoutTimer = setTimeout(() => setShowTimeout(true), timeout);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(timeoutTimer);
    };
  }, [delay, timeout]);

  if (!showSpinner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50 fade-in">
      <div className="text-center flex justify-center flex-col items-center space-y-5">
        <div
          className="w-8 h-8 rounded-full animate-spin
          border-4 border-dashed border-gray-900 border-t-transparent shadow-sm mb-4"
        ></div>
        {showTimeout && (
          <p className="text-gray-600 fade-in">
            This is taking longer than expected. Please check your connection.
          </p>
        )}
      </div>
    </div>
  );
};
export default SpinnerLoader;
