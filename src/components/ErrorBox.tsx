import styled from 'styled-components';

export const ErrorBox = styled.div`
  background-color: rgba(255, 0, 0, 0.1);
  padding: var(--spacing-xs);
  color: ${({ theme }) => theme.colors.text};
`;
