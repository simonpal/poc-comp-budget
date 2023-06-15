import styled from 'styled-components';

type UserImageProps = {
  url: string;
  size?: number;
  alt: string;
};

type StyledImageProps = {
  $size: number;
};

const StyledImage = styled.img<StyledImageProps>`
  display: inline-flex;
  border-radius: 50%;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border: ${({ theme }) =>
    `2px solid ${
      theme.isDark ? theme.colors.primary : theme.colors.secondary
    }`};
`;

export const UserImage: React.FunctionComponent<UserImageProps> = ({
  url,
  size = 50,
  alt,
}) => {
  return <StyledImage $size={size} src={url} alt={alt} />;
};
