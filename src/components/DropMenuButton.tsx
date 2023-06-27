import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { Button } from "./Button";
import { AngleDownIcon } from "./Icons/AngleDownIcon";

type DropdownStyledProps = {
  $maxHeight: number;
  $fromTop: boolean;
  $fromRight: boolean;
};

export type DropMenuButtonProps = {
  label: string | React.ReactElement;
  id: string;
  fromRight?: boolean;
};

const CustomDropdownButton = styled.div`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.1s ease;
    margin-right: 0.25rem !important;
  }
  .expanded {
    transform: rotate(180deg);
  }
`;

const DropMenuButtonWrapper = styled.div<DropdownStyledProps>`
  position: relative;

  [aria-expanded="true"] + [role="menu"] {
    display: flex;
  }
  [role="menu"] {
    display: none;
    position: absolute;
    box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.16);
    max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
    flex-direction: column;
    left: ${({ $fromRight }) => ($fromRight ? "auto" : "0")};
    right: ${({ $fromRight }) => ($fromRight ? "0" : "auto")};
    overflow: auto;
    top: calc(100% + 1px);
    bottom: auto;
    background-color: ${({ theme }) => theme.colors.inputBg};
    padding: 0;
    margin: 0;
    width: 280px;
    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 var(--spacing-s);
      border-bottom: ${({ theme }) =>
        `1px solid ${
          theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
        }`};
      &:last-of-type {
        border-bottom: 0;
      }
    }
    button {
      border-radius: 0;
      width: 100%;
      text-align: left;
      justify-content: flex-start;
    }
    ${({ $fromTop }) =>
      !$fromTop &&
      css`
        top: auto;
        bottom: calc(100% + 1px);
        /* margin: 0 0 1rem 0; */
      `};
  }

  svg {
    margin: 0;
  }
`;

const MAX_HEIGHT = 300;

export const DropMenuButton: React.FunctionComponent<
  DropMenuButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ label, id, fromRight = false, children, ...rest }) => {
  const [expanded, setExpanded] = useState(false);
  const [fromTop, setFromTop] = useState<boolean>(true);
  const [dropMaxHeight, setDropMaxHeight] = useState<number>(MAX_HEIGHT);

  const dropMenuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (dropMenuRef.current && !dropMenuRef.current.contains(e.target)) {
      setExpanded(false);
    }
  };

  const getElementFromTop = useCallback((): void => {
    if (dropMenuRef.current && buttonRef.current) {
      const dropRect = dropMenuRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonFromTop = buttonRect.top + buttonRect.height;
      const { clientHeight } = document.documentElement;
      const downwards = dropRect.height + buttonFromTop < clientHeight;
      setFromTop(downwards);
      //   const inUpperHalf = dropRect.top < clientHeight / 2 - dropRect.height / 2
      let maxHeight = MAX_HEIGHT;
      //   setFromTop(inUpperHalf)
      if (buttonRect.top > 0 && buttonFromTop < clientHeight) {
        // const margin = 16
        const setHeight = downwards
          ? clientHeight - (buttonFromTop + dropRect.height)
          : buttonFromTop;
        maxHeight = setHeight > maxHeight ? maxHeight : setHeight; // - margin
      }
      setDropMaxHeight(maxHeight);
    }
  }, []);

  useEffect(() => {
    if (expanded) {
      getElementFromTop();
      window.addEventListener("scroll", getElementFromTop);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("scroll", getElementFromTop);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded, getElementFromTop]);

  return (
    <DropMenuButtonWrapper
      $fromRight={fromRight}
      $maxHeight={dropMaxHeight}
      $fromTop={fromTop}
    >
      {typeof label === "string" ? (
        <Button
          type="button"
          aria-haspopup="true"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          ref={buttonRef}
          {...rest}
        >
          {label}
        </Button>
      ) : (
        <CustomDropdownButton
          role="button"
          aria-haspopup="true"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          ref={buttonRef}
        >
          <AngleDownIcon className={`${expanded ? "expanded" : ""}`} />
          {label}
        </CustomDropdownButton>
      )}
      <ul
        role="menu"
        id={id}
        aria-label={typeof label === "string" ? label : id}
        ref={dropMenuRef}
      >
        {React.Children.map(children, child => {
          if (!child) return null;
          return <li>{child}</li>;
        })}
        {/* {children} */}
      </ul>
    </DropMenuButtonWrapper>
  );
};
