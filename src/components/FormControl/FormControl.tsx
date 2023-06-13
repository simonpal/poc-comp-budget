import styled from 'styled-components'

type FormControlProps = {
  fullWidth?: boolean
  inlineControl?: boolean
}

export const FormControl = styled.div<FormControlProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  flex-direction: ${({ inlineControl }) => (inlineControl ? 'row' : 'column')};
  position: relative;
  .input-icon {
    position: absolute;
    bottom: calc(var(--size-input-default, 3rem) / 2);
    transform: translateY(50%);
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &.clickable {
      cursor: pointer;
    }

    svg path {
      fill: var(--color-grey-scale-onwhite);
    }
  }

  &.input-disabled {
    .input-icon {
      svg path {
        fill: var(--color-grey-scale-grey100);
      }
    }
  }

  &.icon-position-left {
    .input-icon {
      left: var(--spacing-2xs);
      right: auto;
    }

    input.co-form-element:not([type='checkbox']):not([type='radio']) {
      text-indent: var(--spacing-m);
    }
  }

  &.icon-position-right {
    .input-icon {
      left: auto;
      right: var(--spacing-2xs);
    }
  }
  .base-form-input-error {
    margin-top: var(--spacing-2xs);
    font-size: 0.75rem;
    color: #ff0000;

    &.fill {
      background-color: rgba(255, 0, 0, 0.1);
      padding: var(--spacing-2xs);
      color: #000;
    }
  }
`
