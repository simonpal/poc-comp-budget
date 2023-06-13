import React from 'react';
import styled from 'styled-components';

const StyledToggleSwitch = styled.div`
  --switch-color: ${({ theme }) => theme.colors.secondary};
  position: relative;
  margin-right: 10px;
  width: 75px;
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  text-align: left;
  input[type='checkbox'] {
    display: none;
  }
  label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border-radius: 20px;
    margin: 0;
    &:focus {
      outline: none;
      > .toggle-switch-switch {
        box-shadow: 0 0 2px 5px var(--switch-color);
      }
    }
    > span:focus {
      outline: none;
    }
  }
  .toggle-switch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
    &:before,
    &:after {
      display: block;
      float: left;
      width: 50%;
      height: 34px;
      padding: 0;
      line-height: 34px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5); // TODO: set as variable
      font-weight: bold;
      box-sizing: border-box;
    }
    &:before {
      content: attr(data-yes);
      text-transform: uppercase;
      padding-left: 10px;
      background-color: var(--switch-color);
      color: #fff;
    }
  }
  .toggle-switch-disabled {
    /* background-color: #eee; */
    opacity: 0.5;
    cursor: not-allowed;
    &:before {
      /* background-color: #eee; */
      cursor: not-allowed;
    }
  }
  .toggle-switch-inner:after {
    content: attr(data-no);
    text-transform: uppercase;
    padding-right: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    color: #000;
    text-align: right;
  }
  .toggle-switch-switch {
    display: block;
    width: 24px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  input[type='checkbox']:checked + label {
    .toggle-switch-inner {
      margin-left: 0;
    }
    .toggle-switch-switch {
      right: 0px;
    }
  }
  &.small-switch {
    width: 40px;
    .toggle-switch-inner {
      &:after,
      &:before {
        content: '';
        height: 20px;
        line-height: 20px;
      }
    }
    .toggle-switch-switch {
      width: 16px;
      right: 20px;
      margin: 2px;
    }
  }
`;

export type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  optionLabels?: string[];
  small?: boolean;
  disabled?: boolean;
};

export const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels = ['Yes', 'No'],
  small,
  disabled,
}: ToggleSwitchProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.code !== 'Enter' && e.code !== 'Space') return;

    e.preventDefault();
    onChange(!checked);
  };

  return (
    <StyledToggleSwitch
      className={`${small ? ' small-switch' : ''}`}
      role="switch"
      aria-checked={checked}
    >
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? 'toggle-switch-inner toggle-switch-disabled'
                : 'toggle-switch-inner'
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? 'toggle-switch-switch toggle-switch-disabled'
                : 'toggle-switch-switch'
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </StyledToggleSwitch>
  );
};
