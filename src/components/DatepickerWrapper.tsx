import styled from 'styled-components';

export const DatepickerWrapper = styled.div`
  .react-datepicker__input-container {
    input {
      height: 3rem;
      width: 100%;
      background-color: var(--input-background);
      color: ${({ theme }) => theme.colors.text};
      padding: 0 var(--spacing-s);
      border: 1px solid #000;
    }
  }
`;
