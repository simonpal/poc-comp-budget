import { useCombobox } from "downshift";
import React from "react";
import { Label } from "./FormControl/Label";
import { FormControl } from "./FormControl/FormControl";
import styled from "styled-components";
import { AngleDownIcon } from "./Icons/AngleDownIcon";

const ComboBoxWrapper = styled.div`
  --input-radius: 0;
  --size-input-default: 3rem;
  max-width: 100%;
  flex-grow: 1;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text};
  border-radius: var(--input-radius);
  border: 1px solid #000;
  height: var(--size-input-default);
  position: relative;
  &.disabled {
    opacity: 0.5;
  }
  input {
    padding: 0 var(--spacing-s);
    width: 100%;
    height: 100%;
    border: 0;
    background-color: var(--input-background);
    /* &:disabled {
      opacity: 0.5;
    } */
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    height: var(--size-input-default);
    width: var(--size-input-default);
    border-width: 0;
    background-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg {
      transition: transform 0.2s ease;
    }
    &.open {
      svg {
        transform: rotate(180deg);
      }
    }
    /* &:disabled {
      opacity: 0.5;
    } */
  }
  ul {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--input-background);
    list-style-type: none;
    padding: 0;
    z-index: 100;
    border-width: 1px 1px 1px;
    border-style: solid;
    border-color: #eee;
    box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.16);
    li {
      padding: var(--spacing-s);
      border-bottom: 1px solid #eee;
      border-width: 1px 0 1px 0;
      border-style: solid;
      border-color: transparent;
      &:last-of-type {
        border-bottom: 0;
      }
      &.highlight {
        background-color: rgba(0, 0, 0, 0.05);
        border-color: blue;
      }
      &.selected {
        font-weight: bold;
      }
    }
    &.hidden {
      display: none;
    }
  }
`;

type ComboOption = {
  id: string;
  title: string;
};

type ComboBoxProps = {
  data: ComboOption[];
  fullWidth?: boolean;
  label: string;
  hideLabel?: boolean;
  disabled?: boolean;
  name?: string;
  defaultValue?: string;
  handleChange: (val: ComboOption | null | undefined) => void;
};

const filterOptions = (inputValue?: string) => {
  const lowerCasedInputValue = inputValue?.toLowerCase();

  return function booksFilter(item: ComboOption) {
    return (
      !inputValue ||
      !lowerCasedInputValue ||
      item.title.toLowerCase().includes(lowerCasedInputValue) ||
      item.id.toString().toLowerCase().includes(lowerCasedInputValue)
    );
  };
};
export const ComboBox: React.FunctionComponent<ComboBoxProps> = ({
  data,
  label,
  fullWidth = false,
  hideLabel = false,
  disabled = false,
  defaultValue,
  name,
  handleChange,
}) => {
  const [items, setItems] = React.useState<ComboOption[]>(data);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(data.filter(filterOptions(inputValue)));
    },
    items,
    initialInputValue: defaultValue,
    itemToString(item) {
      return item ? item.title : "";
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      handleChange(newSelectedItem),
  });

  return (
    <FormControl fullWidth={fullWidth}>
      {!hideLabel && (
        <Label {...getLabelProps()}>
          {label}
          {/* {required && (
              <span className="required-symbol">{requiredText}</span>
            )} */}
        </Label>
      )}
      <ComboBoxWrapper className={`${disabled && "disabled"}`}>
        <input
          name={name}
          placeholder={label}
          {...getInputProps()}
          disabled={disabled}
        />
        <button
          aria-label="toggle menu"
          className={`${isOpen && "open"}`}
          disabled={disabled}
          type="button"
          {...getToggleButtonProps()}>
          <AngleDownIcon />
        </button>
        <ul
          className={`${!(isOpen && items.length) && "hidden"}`}
          {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                className={`
                  ${highlightedIndex === index && "highlight"}
                  ${selectedItem === item && "selected"}
                  `}
                key={`${item.id}${index}`}
                {...getItemProps({ item, index })}>
                <span>{item.title}</span>
              </li>
            ))}
        </ul>
      </ComboBoxWrapper>
    </FormControl>
  );
};
