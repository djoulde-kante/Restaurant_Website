import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Ici on pourrait envoyer l'erreur à un service de logging
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center">
          <div className="text-red-500 text-xl mb-4">🚨 Une erreur est survenue</div>
          <p className="text-gray-600 mb-4">
            {this.state.error?.message || 'Une erreur inattendue s\'est produite'}
          </p>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Réessayer
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
