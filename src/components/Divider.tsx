import React from "react";
import styled from "styled-components";
// import { getClasses, getShortSpacing } from '../utils/helpers';
import { Spacings } from "../types";

export type DividerProps = {
  color?: string;
  spacing: Spacings;
  mobileSpacing?: Spacings;
};
type StyledDividerProps = {
  $spacing: Spacings;
  $mobileSpacing?: Spacings;
};

const StyledDivider = styled.div<StyledDividerProps>(
  ({ theme, $spacing, $mobileSpacing }) => `
  --divider-color: ${theme.colors.silver};
  height: 1px;
  margin: ${`var(--spacing-${$spacing}) 0`};
  background-color: var(--divider-color);
  @media screen and (max-width: ${theme.breakpoints.xs.max}) {
    margin: ${`var(spacing-${$mobileSpacing}) 0`};
  }
`
);

export const Divider: React.FunctionComponent<
  DividerProps & React.HTMLAttributes<HTMLDivElement>
> = ({ color, spacing = "l", mobileSpacing, className, ...rest }) => {
  const inlineStyle = {
    ...(color && { ["--divider-color"]: color }),
  } as React.CSSProperties;
  return (
    <StyledDivider
      aria-hidden="true"
      className={`base-divider ${className ? ` ${className}` : ""}`}
      $spacing={spacing}
      $mobileSpacing={mobileSpacing ?? spacing}
      style={inlineStyle}
      {...rest}
    />
  );
};
