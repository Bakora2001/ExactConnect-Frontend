import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
      isRetrying: false, // New state to track retry status
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Send error logs to an external monitoring service (e.g., Sentry, LogRocket)
  }

  handleRetry = () => {
    if (this.state.retryCount < 3) {
      // Set retry state to true and disable the button
      this.setState({ isRetrying: true });

      // Simulate a retry process (e.g., wait for 2 seconds)
      setTimeout(() => {
        this.setState((prevState) => ({
          hasError: false,
          error: null,
          retryCount: prevState.retryCount + 1,
          isRetrying: false, // Reset retry state after completion
        }));
      }, 2000); // Simulate a 2-second delay
    } else {
      console.warn("Maximum retries reached. Suggesting full reload.");
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#131312] px-6">
          <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-4">
              An unexpected error occurred. 
              {this.state.retryCount < 3 ? " Please try again." : " You may need to reload the page."}
            </p>

            {/* Show "Try Again" button if retries are available */}
            {this.state.retryCount < 3 ? (
              <button
                onClick={this.handleRetry}
                disabled={this.state.isRetrying} // Disable button during retry
                className="mt-4 px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {this.state.isRetrying ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Retrying...
                  </div>
                ) : (
                  "Try Again"
                )}
              </button>
            ) : (
              <button
                onClick={this.handleReload}
                className="mt-4 px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 shadow-md"
              >
                Reload Page
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;