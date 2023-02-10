import {
  default as React,
  FunctionComponent,
  ReactNode,
  Suspense,
} from 'react';
import { default as useErrorBoundary } from 'use-error-boundary';

/*
 * Provide a "boundary" for self contained components.
 *
 * Be carful using this, pushing loading further down into components can decrease performance.
 */
export const Boundary: FunctionComponent<{
  children: ReactNode;
  whenLoading: ReactNode;
  whenErroring: FunctionComponent<{ error: Error | string }>;
}> = ({ children, whenLoading, whenErroring }) => {
  const { ErrorBoundary, error } = useErrorBoundary({
    // TODO: Disable error logging for errors that are handled.
    //       https://github.com/facebook/react/issues/15069
    onDidCatch: _error => {
      /* noop */
    },
  });
  if (error) {
    return whenErroring({ error });
  }

  return (
    <Suspense fallback={whenLoading}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};
