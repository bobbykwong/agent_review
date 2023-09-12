import React, { Component, ReactNode  } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface ErrorBoundaryProps {
    children: ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error or perform other actions here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error message or UI here
      return (
        <div className='flex justify-center'>
          <SentimentVeryDissatisfiedIcon fontSize='large'/> 
          <p className="text-xl">&nbsp; Oops! Something went wrong. Try refreshing your browser</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
