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

const StyledColumn = styled.div<ColumnProps>(
  ({
    theme,
    lg,
    $spacing,
    justifyContent,
    alignItems,
    flexGrow,
    lgOffset,
    mdOffset,
    smOffset,
    xsOffset,
    md,
    sm,
    xs,
    $mobileSpacing,
  }) => `
  display: flex;
  flex-direction: column;
  width: ${`calc(${getSize(Number(lg))}% - var(--spacing-${$spacing}))`};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-grow: ${flexGrow};
  ${
    lgOffset &&
    css`
      margin-left: ${100 / Number(lgOffset)}%;
    `
  }
  @media screen and (min-width: ${
    theme.breakpoints.md.min
  }px) and (max-width: ${theme.breakpoints.md.max}px) {
    width: ${
      Number(md) < 12
        ? `calc(${getSize(Number(md))}% - var(--spacing-${$spacing}))`
        : '100%'
    };
    ${
      mdOffset &&
      css`
        margin-left: ${100 / Number(mdOffset)}%;
      `
    }
  }
  @media screen and (min-width: ${
    theme.breakpoints.sm.min
  }px) and (max-width: ${theme.breakpoints.sm.max}px) {
    width: ${
      Number(sm) < 12
        ? `calc(${getSize(Number(sm))}% - var(--spacing-${$spacing}))`
        : '100%'
    };
    ${
      smOffset &&
      css`
        margin-left: ${100 / Number(smOffset)}%;
      `
    }
  }
  @media screen and (min-width: ${
    theme.breakpoints.xs.min
  }px) and (max-width: ${theme.breakpoints.xs.max}px) {
    width: ${
      Number(xs) < 12
        ? `calc(${getSize(Number(xs))}% - var(--spacing-${$mobileSpacing}))`
        : '100%'
    };
    ${
      xsOffset &&
      css`
        margin-left: ${100 / Number(xsOffset)}%;
      `
    }
  }
`
);

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
