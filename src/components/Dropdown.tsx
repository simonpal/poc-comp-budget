import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { AngleDownIcon } from "./Icons/AngleDownIcon";
// import { DropdownItem, Option } from './DropdownItem';
import { useRoveFocus } from "../utils/customHooks";

const StyledDropdown = styled.div`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: var(--input-radius, 0);
  position: relative;
  height: var(--size-input-default, 3rem);
  min-height: 2.5rem;
  align-items: center;
  display: inline-flex;
  padding: var(--spacing-s);
  cursor: pointer;
  color: #000;

  &.is-focused {
    border: 1px solid #eee;
  }

  .dropdown-icon {
    transition: transform 0.2s ease;
    transform-origin: center center;
    position: absolute;
    top: 50%;
    right: var(--spacing-s);
    transform: translateY(-50%) rotate(0);
    display: inline-flex;
    align-items: center;

    > svg path {
      fill: #000;
    }

    &.is-focused {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  input.dropdown-input {
    border: 0;
    background: transparent;
    color: #000;
    width: 100%;
    margin-left: 0px;
    padding: 0;

    &.has-icon {
      width: calc(100% - var(--spacing-l));
      margin-left: var(--spacing-l);
    }

    &.has-value::placeholder {
      opacity: 0.5;
    }

    &:focus {
      outline: 0;
    }
  }

  .dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    overflow: auto;
    top: auto;
    bottom: calc(100% + 1px);
    left: 0;
    width: 100%;
    border-width: 1px 1px 1px;
    border-style: solid;
    border-color: #eee;
    box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.16);
    background: #fff;
    transform: scaleY(0);
    transition: transform 0.2s ease;
    transform-origin: bottom left;
    z-index: 5;

    &.from-top {
      top: calc(100% + 1px);
      bottom: auto;
      transform-origin: top left;
    }

    &.is-focused {
      transform: scaleY(1);
    }

    > li {
      border-top: 1px solid #eee;
      padding: var(--spacing-2xs) var(--spacing-s);
      font-size: 1rem;

      &:last-of-type {
        border-bottom: 0;
      }

      &:hover {
        background: #eee;
      }

      &[aria-selected="true"] {
        border: 1px 0 1px 0 solid #0000ff;
      }

      &.locate-menu-item {
        border-top: 1px solid #f5f5f5;
        padding: 0;
      }
    }
  }

  &.disabled {
    cursor: default;
    opacity: 0.5;
  }

  button.clear-button {
    border: 0;
    background: transparent;
    margin-right: var(--spacing-s);
    position: relative;
    z-index: 2;
    padding: 0 var(--spacing-xs) 0 0;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled {
      opacity: 0.2;
    }

    > svg path {
      fill: var(--color-grey-scale-black);
    }
  }

  .icon {
    margin-right: var(--spacing-s);
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg path {
      fill: #000;
    }

    &.search-icon {
      margin-right: 0;
      position: absolute;
      top: 50%;
      left: var(--spacing-s);
      transform: translateY(-50%);
    }
  }

  .styled-label {
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    padding-right: var(--spacing-l);

    &.clearable {
      padding-right: var(--spacing-s);
    }
  }

  .locate-button {
    background: none;
    padding: var(--spacing-xs);
    font-size: 1rem;
    border: 0;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    width: 100%;
    align-items: center;
    font-weight: bold;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    svg {
      flex-shrink: 0;
      margin-right: var(--spacing-2xs);

      path {
        fill: #000;
      }
    }
  }
`;

// TODO: Search is buggy, needs some fixing

const debounce = (delay: number, fn: Dispatch<SetStateAction<string>>) => {
  let inDebounce: any = null;
  return (args: any) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn(args), delay);
  };
};

export type DropdownProps = {
  placeholder: string;
  options?: Option[];
  search?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  handleChange?: (val: Option | null) => void;
  icon?: JSX.Element;
  value?: string;
  clearable?: boolean;
  maxHeight?: string;
};

export type Option = {
  value: string;
  text: string;
  key: string;
};

export type DropdownItemProps = {
  option: Option;
  focus: boolean;
  index: number;
  handleClick: (e: any, option: Option, index: number) => void;
};

const DropdownItem: React.FunctionComponent<
  DropdownItemProps & React.HTMLAttributes<HTMLLIElement>
> = ({ option, focus, index, handleClick }) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (focus && ref.current) {
      // Move element into view when it is focused
      ref.current.focus();
      ref.current.setAttribute("aria-selected", "true");
    } else if (!focus && ref.current) {
      ref.current.setAttribute("aria-selected", "false");
    }
  }, [focus]);

  return (
    <li
      role="option"
      aria-checked={focus}
      aria-selected={focus}
      onClick={(e) => handleClick(e, option, index)}
      tabIndex={focus ? 0 : -1}
      ref={ref}
      onKeyPress={(e) => handleClick(e, option, index)}>
      {option.text}
    </li>
  );
};

export const Dropdown = forwardRef<
  HTMLUListElement,
  DropdownProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      placeholder,
      options,
      search,
      disabled,
      defaultValue,
      value,
      icon,
      // clearable,
      handleChange,
      maxHeight: setMaxHeight,
      ...rest
    },
    ref?: React.Ref<HTMLUListElement>
  ) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      defaultValue
    );
    const [searchValue, setSearchValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [fromTop, setFromTop] = useState<boolean>(true);
    const [dropMaxHeight, setDropMaxHeight] = useState<number>(300);
    const [hasValue, setHasValue] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(
      options || []
    );
    const [focus, setFocus] = useRoveFocus(
      filteredOptions ? filteredOptions?.length : 0,
      isFocused
    );

    const dropMenuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: any, option: Option, index: number) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent.type === "keypress" && e.nativeEvent.code !== "Enter") {
        // Needed because focus of element when searching
        // Check if keypress is a valid string
        // const stringPattern = /^[a-zA-ZåäöÅÄÖ]/;
        // const match = e.nativeEvent.key.match(stringPattern);
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.value += e.nativeEvent.key;
          setSearchValue(inputRef.current.value);
        }
        return;
      }

      setSelectedValue(option.text);
      setFocus(index);
      setSearchValue("");
      setIsFocused(false);
      if (inputRef.current) inputRef.current.value = "";
      setFilteredOptions(options || []);
      if (handleChange) handleChange(option);
    };

    const handleClickOutside = (e: any) => {
      if (dropMenuRef.current && !dropMenuRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };

    const searchDebounce = useCallback(debounce(500, setSearchValue), []);

    const getElementFromTop = useCallback((): void => {
      if (dropMenuRef.current) {
        const dropRect = dropMenuRef.current.getBoundingClientRect();
        const { clientHeight } = document.documentElement;
        const inUpperHalf =
          dropRect.top < clientHeight / 2 - dropRect.height / 2;
        let maxHeight = 300;
        setFromTop(inUpperHalf);
        if (dropRect.top > 0 && dropRect.top < clientHeight) {
          const margin = 16;
          const setHeight = inUpperHalf
            ? clientHeight - (dropRect.top + dropRect.height)
            : dropRect.top;
          maxHeight = setHeight > maxHeight ? maxHeight : setHeight - margin;
        }
        setDropMaxHeight(maxHeight);
      }
    }, []);

    const emitHandle = (newValue: string | null) => {
      const newOption = options?.find((o) => o.text === newValue) || null;

      if (handleChange) {
        handleChange(newOption);
      }
    };

    const handleDropdownKeyPress = (e: any) => {
      if (e.key === "Escape") {
        setIsFocused(false);
      } else if (e.key === "Enter" && !disabled) {
        setIsFocused(!isFocused);
      }
    };

    useEffect(() => {
      // console.log('Handle search value: ', searchValue);
      if (searchValue.length > 0 && options) {
        setFilteredOptions([
          ...options.filter(
            (option: Option) =>
              option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
              option.text.toLowerCase().includes(searchValue.toLowerCase())
          ),
        ]);
      } else {
        setFilteredOptions(options || []);
      }
    }, [searchValue, options]);

    // const clearValue = (e: any) => {
    //   e.stopPropagation()
    //   setSelectedValue(defaultValue)
    //   emitHandle(null)
    // }

    useEffect(() => {
      if (inputRef.current) {
        if (isFocused) {
          inputRef.current.focus();
        } else {
          inputRef.current.blur();
        }
      }
      if (isFocused) {
        getElementFromTop();
        window.addEventListener("scroll", getElementFromTop);
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        window.removeEventListener("scroll", getElementFromTop);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isFocused]);

    useEffect(() => {
      if (selectedValue && selectedValue.length > 0) {
        setHasValue(true);
        emitHandle(selectedValue);
      } else {
        setHasValue(false);
      }
    }, [selectedValue]);

    useEffect(() => {
      if (options) {
        setFilteredOptions([...options]);
      }
    }, [options]);

    useEffect(() => {
      setSelectedValue(defaultValue);
    }, [defaultValue]);

    return (
      <StyledDropdown
        className={` ${disabled ? "disabled" : ""} ${
          isFocused ? "is-focused" : ""
        }`}
        ref={dropMenuRef}
        role="combobox"
        aria-expanded={isFocused}
        aria-disabled={disabled || false}
        onClick={() => !disabled && setIsFocused(!isFocused)}
        onKeyDown={handleDropdownKeyPress}
        tabIndex={0}
        {...rest}>
        {search && icon && <div className="icon search-icon">{icon}</div>}
        {search && (
          <input
            // isFocused={isFocused}
            className={`dropdown-input ${!!icon && "has-icon"} ${
              hasValue && ".has-value"
            }`}
            disabled={disabled || false}
            ref={inputRef}
            type="text"
            aria-autocomplete="list"
            aria-label={selectedValue || placeholder}
            autoComplete="off"
            tabIndex={0}
            placeholder={hasValue ? selectedValue : placeholder}
            onChange={(e) => searchDebounce(e.target.value)}
          />
        )}
        {!search && (
          <label
            className={`styled-label`}
            role="alert"
            aria-live="polite"
            aria-atomic="true">
            {icon && <div className="icon">{icon}</div>}
            {hasValue ? selectedValue : placeholder}
          </label>
        )}
        {/* {clearable && (
          <button
            className="clear-button"
            title="clear value"
            disabled={selectedValue === defaultValue}
            onClick={clearValue}
          >
            <TimesIcon />
          </button>
        )} */}
        <i
          aria-hidden="true"
          className={`dropdown-icon ${isFocused && "is-focused"}`}>
          <AngleDownIcon />
        </i>
        {filteredOptions.length > 0 && (
          <ul
            className={`dropdown ${isFocused ? "is-focused" : ""} ${
              fromTop ? "from-top" : ""
            }`}
            style={{ maxHeight: `${setMaxHeight || dropMaxHeight}px` }}
            aria-label={placeholder}
            role="listbox"
            ref={ref}>
            {filteredOptions.map((option: Option, index: number) => (
              <DropdownItem
                key={option.value}
                option={option}
                index={index}
                handleClick={handleClick}
                focus={focus === index}
              />
            ))}
          </ul>
        )}
      </StyledDropdown>
    );
  }
);
