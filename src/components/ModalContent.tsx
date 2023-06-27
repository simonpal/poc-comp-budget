import styled from "styled-components";

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.pageBg};
  padding: var(--spacing-xl);
  border-radius: 1rem;
  overflow: auto;
`;
