import styled from "styled-components";

export const Textarea = styled.textarea`
  background-color: var(--input-background);
  color: ${({ theme }) => theme.colors.text};
  padding: var(--spacing-s);
  border: 1px solid #000;
`;
