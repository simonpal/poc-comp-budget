// import './Grid.scss'

import React, { Children, cloneElement, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

// import { getClasses } from '../../helpers'
// import { AlignItems, Direction, Justify, Spacings } from '../../types'
import { Column, ColumnProps } from './Column';
import { AlignItems, Direction, Justify, Spacings } from '../types';
import { BREAKPOINTS } from '../theme';

export type GridProps = {
  spacing: Spacings;
  direction?: Direction;
  mobileDirection?: Direction;
  justifyContent?: Justify;
  alignItems?: AlignItems;
  //   width?: string
  mobileSpacing?: Spacings;
};

type StyledProps = {
  $spacing: Spacings;
  $direction?: Direction;
  $mobileDirection?: Direction;
  $justifyContent?: Justify;
  $alignItems?: AlignItems;
  //   width?: string
  $mobileSpacing?: Spacings;
};

const StyledGrid = styled.div<StyledProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${({ $spacing }) => `var(--spacing-${$spacing})`};
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $alignItems }) => $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  /* > div {
    margin: ${({ $spacing }) => `0 calc(var(--spacing-${$spacing}) * -1)`};
  } */
  @media screen and (max-width: ${BREAKPOINTS.xs.max}px) {
    flex-direction: ${({ $mobileDirection }) => $mobileDirection};
  }
  ${({ $mobileSpacing }) =>
    $mobileSpacing &&
    css`
      @media screen and (max-width: ${BREAKPOINTS.xs.max}px) {
        gap: ${$mobileSpacing};
      }
    `}
`;

export const Grid: React.FunctionComponent<
  GridProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  spacing = 's',
  direction = 'row',
  mobileDirection = 'column',
  justifyContent = 'space-between',
  alignItems = 'stretch',
  mobileSpacing,
  children,
  //   width = '100%',
  //   className,
  ...rest
}) => {
  return (
    <StyledGrid
      $spacing={spacing}
      $direction={direction}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $mobileSpacing={mobileSpacing}
      $mobileDirection={mobileDirection}
      {...rest}
    >
      {Children.map(children, (child) => {
        const item = child as React.ReactElement<
          PropsWithChildren<ColumnProps>
        >;

        if (item.type === Column) {
          return cloneElement(item, {
            $spacing: spacing,
            $mobileSpacing: mobileSpacing ?? spacing,
          });
        } else {
          return child;
        }
      })}
    </StyledGrid>
  );
};
