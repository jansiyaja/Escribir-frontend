import React from "react";
import { AlertCircle } from "lucide-react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 px-4 py-16">
          <div className="max-w-3xl mx-auto">
           
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-4xl font-serif mb-4 text-gray-900">
                Oops! Something Went Wrong
              </h1>
              <div className="w-16 h-1 bg-red-500 mx-auto mb-8" />
            </div>

            
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <p className="text-gray-600 text-lg leading-relaxed font-serif mb-6">
                {this.state.error?.message || 'An unexpected error has occurred while loading this page.'}
              </p>
              <div className="prose prose-gray max-w-none">
                <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-500">
                  Don't worry - our team has been notified and is working to resolve the issue.
                </blockquote>
              </div>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Try Reloading the Page
              </button>
              <p className="text-sm text-gray-500">
                If the problem persists, please try again later or contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}