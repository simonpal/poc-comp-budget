import React from 'react';
import styled, { keyframes } from 'styled-components';

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const sizes = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '2rem',
  xl: '2.5rem',
  xxl: '4rem',
};

const spin = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledSpinner = styled.div<SpinnerProps>`
  > div,
  > div:after {
    border-radius: 50%;
  }

  > div,
  > div:after {
    width: ${({ size }) => `${sizes[size ?? 'sm']}`};
    height: ${({ size }) => `${sizes[size ?? 'sm']}`};
  }
  > div {
    margin: 0 auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation: ${spin} 1.1s infinite cubic-bezier(0.58, 0.32, 0.44, 0.72); // linear
    border-style: solid;
    border-top-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.2);
    border-left-color: ${({ theme }) =>
      `var(--spinner-color, ${theme.colors.text})`};
    border-width: var(--spinner-width, 0.25rem);
  }
`;

export type SpinnerProps = {
  color?: string;
  size?: Sizes;
  borderWidth?: string;
};

export const Spinner: React.FunctionComponent<
  SpinnerProps & React.HTMLAttributes<HTMLDivElement>
> = ({ color, size = 'sm', borderWidth, className, ...rest }) => {
  const inlineStyle = {
    ...(color && { ['--spinner-color']: color }),
    ...(borderWidth && { ['--spinner-width']: borderWidth }),
  } as any;

  return (
    <StyledSpinner
      size={size}
      className={`${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <div style={inlineStyle} />
    </StyledSpinner>
  );
};
