import React, { useState } from "react";
import styled, { css } from "styled-components";
// import TabItem from '../TabItem';

const TabHeaders = styled.ul<StyledTabProps>`
  display: flex;
  list-style-type: none;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
  padding: 0;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ $spaceEvenly }) =>
    $spaceEvenly &&
    css`
      justify-content: space-evenly;
      li {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }
    `}
  li {
    background-color: transparent;
    display: inline-flex;
    position: relative;
    border: ${({ theme }) => `1px solid ${theme.colors.silver}`};
    button,
    span {
      border: 0;

      color: ${({ theme }) => theme.colors.text};
      background-color: transparent;
      padding: var(--spacing-xs);
      position: relative;
      font-weight: bold;
    }

    button {
      cursor: pointer;
      width: 100%;
      height: 4rem;
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.primaryButtonBg};
      button {
        color: ${({ theme }) => theme.colors.primaryButtonColor};
        /* text-decoration: underline; */
      }
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: ${({ theme }) =>
          `8px solid ${theme.colors.primaryButtonBg}`};
      }
    }

    /* &:not(:first-of-type) {
      button::before,
      span::before {
        content: '';
        border-right: 1px solid #eee;
        height: 18px;
        position: absolute;
        left: 0;
      }
    } */
  }
`;

export type TabProps = {
  children: React.ReactNode[];
  defaultActiveIndex?: number;
  spaceEvenly?: boolean;
  onTabChange?: (idx: number) => void;
  className?: string;
};

type StyledTabProps = {
  $spaceEvenly: boolean;
};

export const Tabs = ({
  children,
  onTabChange,
  defaultActiveIndex = 0,
  spaceEvenly = false,
  className,
}: TabProps) => {
  // Dependant on children

  const [activeTab, setActiveTab] = useState<number>(defaultActiveIndex);

  const isActive = (idx: number): boolean => activeTab === idx;

  const handleClick = (idx: number) => {
    setActiveTab(idx);
    if (typeof onTabChange === "function") {
      onTabChange(idx);
    }
  };

  if (!children) return null;
  return (
    <div>
      <TabHeaders
        $spaceEvenly={spaceEvenly}
        className={`base-tabs-headers ${className}`}
        role="tablist">
        {children &&
          children.map((child: any, index: number) => (
            <li
              className={`${isActive(index) ? "active" : ""} ${
                child.props.disabled ? "disabled" : ""
              }`}
              key={child.props.eventKey}>
              <button
                disabled={child.props.disabled}
                aria-selected={isActive(index)}
                aria-controls={`${child.props.eventKey}-content`}
                id={`${child.props.eventKey}-control`}
                type="button"
                role="tab"
                onClick={() => handleClick(index)}>
                {child.props.title}
              </button>
              {/* 
              {child.props.disabled && <span>{child.props.title}</span>} */}
            </li>
          ))}
      </TabHeaders>
      {children &&
        children.map((item: any, index: number) => (
          <TabItem
            key={`tabitem-${item.props.eventKey}`}
            {...item.props}
            visible={isActive(index)}
          />
        ))}
    </div>
  );
};

export type TabItemProps = {
  children: any;
  eventKey: string;
  title: string;
  disabled?: boolean;
  visible?: boolean;
};

export const TabItem = ({
  children,
  visible = false,
  eventKey,
}: // title,
TabItemProps) => {
  if (!visible) {
    return null;
  }
  return (
    <div
      role="tabpanel"
      id={`${eventKey}-content`}
      aria-labelledby={`${eventKey}-control`}>
      {children}
    </div>
  );
};
