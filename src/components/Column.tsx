import React from 'react';
import styled, { css } from 'styled-components';

import { BREAKPOINTS } from '../theme';
// import { getClasses } from '../../helpers'
import { AlignItems, ColumnSize, Justify, Spacings } from '../types';

const COLS = 12;

export type ColumnProps = {
  xs?: ColumnSize;
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  xsOffset?: ColumnSize;
  smOffset?: ColumnSize;
  mdOffset?: ColumnSize;
  lgOffset?: ColumnSize;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  flexGrow?: '1' | '0';
  $spacing?: Spacings;
  $mobileSpacing?: Spacings;
};

const getSize = (noCols: number) => (noCols / COLS) * 100;

const StyledColumn = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${({ lg, $spacing }) =>
    `calc(${getSize(Number(lg))}% - var(--spacing-${$spacing}))`};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-grow: ${({ flexGrow }) => flexGrow};
  ${({ lgOffset }) =>
    lgOffset &&
    css`
      margin-left: ${100 / Number(lgOffset)}%;
    `}
  @media screen and (min-width: ${BREAKPOINTS.md
    .min}px) and (max-width: ${BREAKPOINTS.md.max}px) {
    width: ${({ md, $spacing }) =>
      `calc(${getSize(Number(md))}% - var(--spacing-${$spacing}))`};
    ${({ mdOffset }) =>
      mdOffset &&
      css`
        margin-left: ${100 / Number(mdOffset)}%;
      `}
  }
  @media screen and (min-width: ${BREAKPOINTS.sm
      .min}px) and (max-width: ${BREAKPOINTS.sm.max}px) {
    width: ${({ sm, $spacing }) =>
      `calc(${getSize(Number(sm))}% - var(--spacing-${$spacing}))`};
    ${({ smOffset }) =>
      smOffset &&
      css`
        margin-left: ${100 / Number(smOffset)}%;
      `}
  }
  @media screen and (min-width: ${BREAKPOINTS.xs
      .min}px) and (max-width: ${BREAKPOINTS.xs.max}px) {
    width: ${({ xs, $mobileSpacing }) =>
      `calc(${getSize(Number(xs))}% - var(--spacing-${$mobileSpacing}))`};
    ${({ xsOffset }) =>
      xsOffset &&
      css`
        margin-left: ${100 / Number(xsOffset)}%;
      `}
  }
`;

export const Column: React.FunctionComponent<
  ColumnProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  xs = '12',
  sm = '12',
  md = '12',
  lg = '12',
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  flexGrow = '1',
  $spacing,
  ...rest
}) => {
  return (
    <StyledColumn
      lg={lg}
      md={md}
      sm={sm}
      xs={xs}
      lgOffset={lgOffset}
      mdOffset={mdOffset}
      smOffset={smOffset}
      xsOffset={xsOffset}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexGrow={flexGrow}
      $spacing={$spacing}
      data-testid="grid-column"
      {...rest}
    />
  );
};
