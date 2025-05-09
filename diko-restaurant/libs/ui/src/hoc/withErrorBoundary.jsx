import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

export function withErrorBoundary(WrappedComponent, { fallback } = {}) {
  const WithErrorBoundary = (props) => {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithErrorBoundary;
}
