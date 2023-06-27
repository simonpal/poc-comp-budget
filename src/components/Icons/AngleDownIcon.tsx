import { IconWrapper } from "../SvgWrapper";

export const AngleDownIcon: React.FC<
  React.HTMLAttributes<SVGElement>
> = props => (
  <IconWrapper viewBox="0 0 20 20" {...props}>
    <title>expand</title>
    <path d="M19 6.25l-1.5-1.5-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z" />
  </IconWrapper>
);
