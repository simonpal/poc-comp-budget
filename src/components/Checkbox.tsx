import React, { forwardRef } from "react";
import styled from "styled-components";

import { FormControl } from "./FormControl/FormControl";
import { Label } from "./FormControl/Label";

const CheckboxWrapper = styled(FormControl)`
  --form-control-color: ${({ theme }) => theme.colors.primary};
  --form-control-disabled: #555;
  align-items: center;
  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: transparent;
    /* Not removed via appearance */
    margin: 0 0.5rem 0 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
    &:before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }
    &:checked:before {
      transform: scale(1);
    }
    &:focus {
      outline: ${({ theme }) =>
        `max(2px, 0.15em) solid ${theme.colors.primary}`};
      outline-offset: max(2px, 0.15em);
    }
    &:disabled {
      --form-control-color: var(--form-control-disabled);

      color: var(--form-control-disabled);
      cursor: not-allowed;
    }
    &:invalid {
      --form-control-color: red;
    }
  }
`;

export type CheckboxProps = {
  fullWidth?: boolean;
  id: string;
  label: string | JSX.Element;
  value?: string;
  hideLabel?: boolean;
  name?: string;
};

export type StyledCheckboxProps = {
  $fullWidth: boolean;
};

export const Checkbox = forwardRef<
  HTMLInputElement,
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      fullWidth = false,
      id,
      label,
      value = "",
      onChange,
      hideLabel,
      className,
      name = "",
      ...rest
    },
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <CheckboxWrapper
        inlineControl
        fullWidth={fullWidth}
        className={`base-checkbox ${className ? ` ${className}` : ""}`}>
        <Label htmlFor={id} tabIndex={0}>
          <input
            type="checkbox"
            id={id}
            onChange={onChange}
            name={name}
            value={value}
            {...rest}
            ref={ref}
          />

          {!hideLabel && label}
        </Label>
      </CheckboxWrapper>
    );
  }
);
