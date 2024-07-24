"use client";

import { AxiosError } from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ServerError = {
  errorCode: string;
  errorMessage: string;
};

type Props = {
  error: Error | AxiosError<ServerError>;
  onRetry?: () => void;
};

const ErrorOccurred = ({ error, onRetry }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.data) {
      const { errorCode } = error.response.data;
      switch (errorCode) {
        case "U_000_0012":
          router.push("/store-not-found");
          break;
        // Handle other error codes as needed
      }
    }
  }, [error, router]);

  let errorMessage = "An unexpected error occurred";

  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      errorMessage = "Network error. Please check your internet connection.";
    } else if (error.response?.data) {
      errorMessage = `Error: ${error.response.data.errorMessage}`;
    }
  } else if (error instanceof Error) {
    // Log unexpected error types
    console.error("Unexpected error:", error);
  }

  return (
    <div className="w-full text-center min-h-dvh flex flex-col space-y-10 justify-center items-center">
      <p className="text-lg text-gray-800">{errorMessage}</p>
      {onRetry && (
        <Button variant="default" onClick={onRetry} className="rounded-full">
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorOccurred;
