//Page for handling any errors in the proxy section
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught and error', error, errorInfo)

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }
  handleReload = () => {
    window.location.reload()
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="text-gray-700 mb-6">The page will reload automatically in 5 seconds...</p>
            <button
              onClick={this.handleReload}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Reload Now
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary