import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

import { AlignItems, Direction, Justify, Spacings } from "../types";
// import { getClasses, getShortSpacing } from '../utils/helpers';

type StyledBoxProps = {
  $width?: string;
  $spacing?: Spacings;
  $topSpacing?: Spacings;
  $bottomSpacing?: Spacings;
  $leftSpacing?: Spacings;
  $rightSpacing?: Spacings;
  $zIndex?: number;
  $justifyContent: Justify;
  $alignItems: AlignItems;
  $flexDirection: Direction;
};

const StyledBox = styled.div<StyledBoxProps>`
  --box-background: transparent;
  --box-color: ${({ theme }) => theme.colors.text};
  background-color: var(--box-background);
  color: var(--box-color);
  position: relative;
  display: flex;
  max-width: 100%;
  width: ${({ $width }) => $width ?? "100%"};
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  ${({ $topSpacing, $spacing }) =>
    $topSpacing &&
    !$spacing &&
    css`
      padding-top: var(--spacing-${$topSpacing});
    `}
  ${({ $bottomSpacing, $spacing }) =>
    $bottomSpacing &&
    !$spacing &&
    css`
      padding-bottom: var(--spacing-${$bottomSpacing});
    `}
  ${({ $leftSpacing, $spacing }) =>
    $leftSpacing &&
    !$spacing &&
    css`
      padding-left: var(--spacing-${$leftSpacing});
    `}
  ${({ $rightSpacing, $spacing }) =>
    $rightSpacing &&
    !$spacing &&
    css`
      padding-right: var(--spacing-${$rightSpacing});
    `}
  ${({ $spacing }) =>
    $spacing &&
    css`
      padding: var(--spacing-${$spacing});
    `}
    ${({ $zIndex }) =>
    $zIndex &&
    css`
      padding: ${$zIndex};
    `}
`;

export type BoxProps = {
  backgroundColor?: string;
  width?: string;
  color?: string;
  topSpacing?: Spacings;
  bottomSpacing?: Spacings;
  leftSpacing?: Spacings;
  rightSpacing?: Spacings;
  spacing?: Spacings;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  zIndex?: number;
  flexDirection?: Direction;
};

export const Box = forwardRef<
  HTMLDivElement,
  BoxProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      width,
      color,
      topSpacing,
      bottomSpacing,
      leftSpacing,
      rightSpacing,
      spacing,
      alignItems = "flex-start",
      justifyContent = "flex-start",
      zIndex,
      backgroundColor,
      flexDirection = "column",
      className,
      ...rest
    },
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const inlineStyle = {
      ...(backgroundColor && { ["--box-background"]: backgroundColor }),
      ...(color && { ["--box-color"]: color }),
    } as any;
    return (
      <StyledBox
        $width={width}
        $zIndex={zIndex}
        $justifyContent={justifyContent}
        $alignItems={alignItems}
        $spacing={spacing}
        $topSpacing={topSpacing}
        $bottomSpacing={bottomSpacing}
        $leftSpacing={leftSpacing}
        $rightSpacing={rightSpacing}
        $flexDirection={flexDirection}
        ref={ref}
        className={`base-box ${className ? ` ${className}` : ""}`}
        style={inlineStyle}
        {...rest}
      />
    );
  }
);
