import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { FormControl } from './FormControl/FormControl';
import { Label } from './FormControl/Label';

const SelectWrapper = styled.div`
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
  --size-input-default: 3rem;
  width: 100%;
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  /* min-width: 15ch;
  max-width: 30ch; */

  border: 1px solid var(--select-border);
  border-radius: 0.25rem;
  height: var(--size-input-default);
  align-items: center;
  padding: 0 0.5rem;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  /* background-image: linear-gradient(to top, #f9f9f9, #fff 33%); */

  select,
  &::after {
    grid-area: select;
  }

  // Custom arrow
  &:not(.select--multiple)::after {
    content: '';
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  height: var(--size-input-default);
  font-size: 1rem;

  z-index: 1;
  outline: none;

  // Remove dropdown arrow in IE10 & IE11
  // @link https://www.filamentgroup.com/lab/select-css.html
  &::-ms-expand {
    display: none;
  }

  &:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid var(--select-focus);
    border-radius: inherit;
  }
  &:disabled {
    opacity: 0.5;
  }
  &:invalid,
  &.has-error {
    border-color: #ff0000;
    color: #ff0000;
  }
  [multiple] {
    padding-right: 0;
    height: 6rem;

    option {
      white-space: normal;

      // Only affects Chrome
      outline-color: var(--select-focus);
    }
  }
`;

export type SelectProps = {
  label: string;
  hideLabel?: boolean;
  error?: string;
  fullWidth?: boolean;
  required?: boolean;
  requiredText?: string;
  disabled?: boolean;
  errorBox?: boolean;
  name?: string;
  //
};

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & React.HTMLAttributes<HTMLSelectElement>
>(
  (
    {
      children,
      hideLabel,
      label,
      id,
      fullWidth,
      required,
      requiredText = '*',
      error,
      errorBox,
      name,
      ...rest
    },
    ref?: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <FormControl fullWidth={fullWidth}>
        {!hideLabel && (
          <Label htmlFor={id}>
            {label}
            {required && (
              <span className="required-symbol">{requiredText}</span>
            )}
          </Label>
        )}
        <SelectWrapper>
          <StyledSelect
            id={id}
            ref={ref}
            required={required}
            name={name}
            {...rest}
          >
            {children}
          </StyledSelect>
          <span className="focus"></span>
        </SelectWrapper>
        {error && error.length > 0 && (
          <div className={`base-form-input-error ${errorBox ? 'fill' : ''}`}>
            {error}
          </div>
        )}
      </FormControl>
    );
  }
);
