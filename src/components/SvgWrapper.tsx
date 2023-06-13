import React from 'react';

// interface IconWrapperProps extends React.HTMLAttributes<HTMLOrSVGElement> {
//   fill?: string
//   viewBox?: string
// }

export const IconWrapper: React.FC<React.SVGProps<SVGSVGElement>> = ({
  children,
  ...rest
}) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};
