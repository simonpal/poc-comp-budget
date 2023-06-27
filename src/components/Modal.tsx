import React, { useEffect } from "react";
import styled from "styled-components";

import { AlignItems, Justify } from "../types";
import { TimesIcon } from "./Icons/TimesIcon";
// import Box from '../box/Box';
import { Overlay, OverlayProps } from "./Overlay";
import { ModalContent } from "./ModalContent";
// import { getClasses } from '../utils/helpers';

type StyledModalProps = {
  $alignItems: AlignItems;
  $justifyContent: Justify;
};
const StyledModal = styled.div<StyledModalProps>`
  max-height: 80%;
  max-width: 90vw;
  overflow: visible;
  width: 50rem;
  display: flex;
  flex-direction: column;
  position: relative;
  button.base-close-button {
    cursor: pointer;
    border: 0;
    z-index: 2;
    padding: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.pageBg};
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.23);
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    right: -24px;
    top: -24px;
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
    svg {
      margin: 0;
    }

    @media screen and (max-width: $breakpoint-mobile-max) {
      width: 32px;
      height: 32px;
      right: -16px;
      top: -16px;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export interface ModalProps extends OverlayProps {
  visible: boolean;
  width?: string;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  onClose: () => void;
}

export const Modal: React.FunctionComponent<
  ModalProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  visible,
  width = "50rem",
  onClose,
  zIndex = 5,
  disableClick = false,
  alignItems = "flex-start",
  justifyContent = "flex-start",
  blur,
  className,
  ...rest
}) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);
  if (!visible) return null;

  const inlineStyle = {
    ...(zIndex && { zIndex: zIndex + 1 }),
    ...(width && { width })
  };

  return (
    <React.Fragment>
      <Overlay
        visible={visible}
        onClose={onClose}
        disableClick={disableClick}
        zIndex={zIndex}
        blur={blur}
      >
        <StyledModal
          className={`base-modal ${className ? ` ${className}` : ""}`}
          style={inlineStyle}
          $alignItems={alignItems}
          $justifyContent={justifyContent}
          {...rest}
        >
          <button
            className={`base-close-button`}
            data-testid="close-button"
            onClick={onClose}
            role="button"
            aria-label="Close"
            title="Close"
            type="button"
          >
            <TimesIcon />
          </button>
          <ModalContent>{children}</ModalContent>
        </StyledModal>
      </Overlay>
    </React.Fragment>
  );
};
