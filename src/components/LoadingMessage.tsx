import styled from "styled-components";
import { Spinner } from "./Spinner";

const StyledLoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: var(--spacing-s) auto var(--spacing-s) auto;
  align-items: center;
`;

type LoadingMessageProps = {
  message: string;
};
export const LoadingMessage: React.FunctionComponent<LoadingMessageProps> = ({
  message,
}) => {
  return (
    <StyledLoadingMessage>
      <Spinner size="md" /> {message}
    </StyledLoadingMessage>
  );
};
