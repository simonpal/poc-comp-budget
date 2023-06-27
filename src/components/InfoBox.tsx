import styled from "styled-components";
import { InfoIcon } from "./Icons/InfoIcon";

const StyledInfoBox = styled.div`
  display: flex;
  background-color: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
  padding: var(--spacing-s);
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
  margin-bottom: 2rem;
  align-items: center;
  font-style: italic;
  svg {
    font-size: 2rem;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    min-width: 2rem;
  }
`;

type InfoBoxProps = {
  children: React.ReactNode;
};

export const InfoBox: React.FunctionComponent<InfoBoxProps> = ({
  children
}) => {
  return (
    <StyledInfoBox>
      <InfoIcon />
      {children}
    </StyledInfoBox>
  );
};
