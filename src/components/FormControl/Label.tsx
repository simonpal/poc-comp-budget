import styled from "styled-components";

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
  margin-bottom: var(--spacing-2xs);

  > span.required-symbol {
    margin-left: var(--spacing-2xs);
  }
`;
