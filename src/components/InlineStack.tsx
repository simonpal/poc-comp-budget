import React from 'react';
import styled from 'styled-components';

import { AlignItems, Justify, Spacings } from '../types';

type StyledInlineStackProps = {
  $spacing: Spacings;
  $justifyContent: Justify;
  $alignItems: AlignItems;
};

const InnerStackWrapper = styled.div<StyledInlineStackProps>`
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  gap: ${({ $spacing }) => `var(--spacing-${$spacing})`};
`;

const ChildWrapper = styled.div`
  display: inline-flex;
`;

export type InlineStackProps = {
  spacing: Spacings;
  children: React.ReactNode;
  justifyContent?: Justify;
  alignItems?: AlignItems;
};

export const InlineStack: React.FunctionComponent<
  InlineStackProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  spacing,
  children,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  className,
  ...rest
}) => {
  return (
    <InnerStackWrapper
      $spacing={spacing}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      className={`base-inline-stack-wrapper ${
        className ? ` ${className}` : ''
      }`}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return <ChildWrapper>{child}</ChildWrapper>;
      })}
    </InnerStackWrapper>
  );
};
