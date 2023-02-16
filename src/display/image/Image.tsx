import React, {
  CSSProperties,
  FunctionComponent,
  ImgHTMLAttributes,
  ReactNode,
  useState,
} from 'react';

/*
 * Render an image with required sizing and error handling.
 */
export const Image: FunctionComponent<{
  src: string;
  width: number;
  height: number;
  className?: string;
  renderError?: (renderErrorProps: {
    width: number;
    height: number;
  }) => ReactNode;
  style?: CSSProperties;
} & ImgHTMLAttributes<any>> = ({
  src,
  height,
  width,
  className,
  style,
  renderError,
  ...propsImage
}) => {
  const [hasError, setHasError] = useState(false);

  // Event Handlers.
  const onError = () => {
    setHasError(() => true);
  };

  // Did an error occur loading the image?
  if (hasError) {
    if (renderError) {
      return <>{renderError({ width, height })}</>;
    }

    // No fallback, render the error as the browser would.
  }

  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={onError}
      {...propsImage}
    />
  );
};
