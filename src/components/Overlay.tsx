import { HTMLMotionProps, motion } from "framer-motion";
import React, { useRef } from "react";
import styled, { css } from "styled-components";
export interface OverlayProps extends HTMLMotionProps<"div"> {
  zIndex?: number;
  visible?: boolean;
  transparent?: boolean;
  disableClick?: boolean;
  blur?: boolean;
  onClose?: () => void;
}

interface StyledOverlayProps extends HTMLMotionProps<"div"> {
  $transparent: boolean;
  $zIndex: number;
  $blur: boolean;
}

const StyledOverlay = styled(motion.div)<StyledOverlayProps>`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ $zIndex }) => $zIndex};
  ${({ $transparent }) =>
    $transparent &&
    css`
      background-color: transparent;
    `}
  ${({ $blur }) =>
    $blur &&
    css`
      backdrop-filter: blur(5px);
    `}
`;

export const Overlay: React.FunctionComponent<
  OverlayProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  transparent = false,
  zIndex = 2,
  visible = false,
  disableClick = false,
  blur = false,
  onClose,
  className,
  ...rest
}) => {
  const ovRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (!disableClick && ovRef.current && e.target === ovRef.current && onClose)
      onClose();
  };

  if (!visible) return null;

  const inlineStyle = {
    ...(zIndex && { ["--overlay-index"]: zIndex }),
  } as any;

  return (
    <StyledOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ovRef}
      className={`base-overlay ${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={inlineStyle}
      $transparent={transparent}
      $zIndex={zIndex}
      $blur={blur}
      {...rest}
      onClick={handleClick}
    />
  );
};
