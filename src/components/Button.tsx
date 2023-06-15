import React, { forwardRef, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';

const ripple = keyframes`
  from {
      opacity: 0.7;
      transform: scale(0);
  }

  to {
      opacity: 0;
      transform: scale(10);
  }
`;

type StyledButtonProps = {
  $fullWidth: boolean;
  $iconLeft: boolean;
  $iconOnly: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  --button-font-size: 16px;
  --color-button-primary-background: ${({ theme }) =>
    theme.colors.primaryButtonBg};
  --color-button-primary-color: ${({ theme }) =>
    theme.colors.primaryButtonColor};
  --color-button-primary-hover: ${({ theme }) => theme.colors.primaryButtonBg};
  --color-button-secondary-background: #eee;
  --color-button-secondary-color: #000;
  --color-button-secondary-hover: #ddd;
  --color-button-tertiary-background: transparent;
  --color-button-tertiary-color: ${({ theme }) => theme.colors.primaryButtonBg};
  --color-button-tertiary-hover: transparent;
  --size-button-default: 3rem;
  --button-radius: 1.5rem;
  --ripple-background: #010101;
  --color-button-outline-background: transparent;
  --color-button-outline-color: ${({ theme }) => theme.colors.primaryButtonBg};
  --color-button-outline-border: ${({ theme }) => theme.colors.primaryButtonBg};
  font-family: inherit;
  background-color: var(--color-button-primary-background);
  color: var(--color-button-primary-color);
  height: var(--size-button-default);
  border-radius: var(--button-radius);
  padding: 0 1rem;
  border-width: 0;
  font-size: var(--button-font-size);
  font-weight: bold;
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  justify-content: center;
  line-height: 100%;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s ease;

  @media screen and (max-width: 600px) {
    position: relative;
    overflow: hidden;

    &::after {
      display: none;
      content: '';
      position: absolute;
      border-radius: 50%;

      width: 100px;
      height: 100px;
      margin-top: -50px;
      margin-left: -50px;

      background-color: var(--ripple-background);

      /* Center the ripple */
      top: 50%;
      left: 50%;

      animation: ${ripple} 1s;
      opacity: 0;
    }

    &:focus:not(:active)::after {
      display: block;
    }
  }

  svg {
    margin: ${({ $iconLeft }) =>
      $iconLeft ? '0 var(--spacing-xs) 0 0' : '0 0 0 var(--spacing-xs)'};
    path {
      fill: var(--color-button-primary-color);
    }
  }
  &:hover {
    @media screen and (min-width: 601px) {
      background-color: var(--color-button-primary-hover);
    }
  }

  &:disabled {
    // background-color: var(--color-button-primary-disabled);
    cursor: default;
    opacity: 0.5;
  }

  &.secondary {
    background-color: var(--color-button-secondary-background);
    color: var(--color-button-secondary-color);

    &:hover {
      @media screen and (min-width: 601px) {
        background-color: var(--color-button-secondary-hover);
      }
    }

    svg path {
      fill: var(--color-button-secondary-color);
    }
  }

  &.tertiary {
    padding: 0;
    background-color: var(--color-button-tertiary-background);
    color: var(--color-button-tertiary-color);

    &:hover {
      @media screen and (min-width: 601px) {
        background-color: var(--color-button-tertiary-hover);
      }
    }

    svg path {
      fill: var(--color-button-tertiary-color);
    }
  }

  &.outline {
    background-color: var(--color-button-outline-background);
    color: var(--color-button-outline-color);
    border: 1px solid var(--color-button-outline-border);

    &:hover {
      @media screen and (min-width: 601px) {
        background-color: var(--color-button-outline-hover);
      }
    }

    svg path {
      fill: var(--color-button-outline-color);
    }
  }
  ${({ $iconOnly }) =>
    $iconOnly &&
    css`
      svg {
        margin: 0;
      }
    `}
`;

export type ButtonProps = {
  priority?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children: React.ReactNode;
  iconLeft?: boolean;
  iconOnly?: boolean;
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
>(
  (
    {
      children,
      priority = 'primary',
      disabled = false,
      type = 'button',
      fullWidth = false,
      onClick,
      iconLeft = false,
      iconOnly = false,
      className,
      ...rest
    },
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const inlineStyle: any = useMemo(
      () => ({
        ['--ripple-background']: `var(--color-button-${priority}-hover)`,
      }),
      [priority]
    );

    return (
      <StyledButton
        style={inlineStyle}
        aria-label={type}
        className={`base-button ${priority} icon-${
          iconLeft ? 'left' : 'right'
        } ${className ? ` ${className}` : ''}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        $fullWidth={fullWidth}
        $iconLeft={iconLeft}
        $iconOnly={iconOnly}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);
