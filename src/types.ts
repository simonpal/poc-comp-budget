export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type Justify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignItems =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

export type Spacings =
  | 'none'
  | '3xs'
  | '2xs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'caption'
  | 'breadcrumbs'
  | 'body-text'
  | 'body-text-special';

export type TypographyAlign =
  | 'inherit'
  | 'left'
  | 'center'
  | 'right'
  | 'justify';

export type FontWeight =
  | 'normal'
  | 'bold'
  | 'heavy'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800';

export type ColumnSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type Severity = 'success' | 'warning' | 'error' | 'info';

export type FlexGrow = '1' | '0';

export type User = {
  name: string;
  userId: string;
  email: string;
  // start: string;
  // image: string;
  // openingBalanceMoney: number;
  // openingBalanceTime: number;
  // yearlyRefill: number;
  // comment: string;
  // hardwareBudget: number;
  // currentMoneyBalance: number;
  // currentTimeBalance: number;
  // currentHardwareBalance: number;
};
export type Budget = {
  name: string;
  userId: string;
  id: string;
  start: string;
  image: string;
  openingBalanceMoney: number;
  openingBalanceTime: number;
  yearlyRefill: number;
  comment: string;
  hardwareBudget: number;
  currentMoneyBalance: number;
  currentTimeBalance: number;
  currentHardwareBalance: number;
};

export type Expense = {
  id: string;
  userId: string;
  type: string;
  date: string;
  sum: number;
  name?: string;
  isHardware: boolean;
  comment: string;
  category: string;
};
export type NewExpense = Pick<
  Expense,
  | 'userId'
  | 'type'
  | 'date'
  | 'sum'
  | 'name'
  | 'isHardware'
  | 'comment'
  | 'category'
>;

export type Category = {
  id: string;
  name: string;
};

export type GoogleProfile = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
};

export type CreateUpdateDeleteType = 'create' | 'update' | 'delete';

export type GoogleUser = {
  email: string;
  name: string;
  picture: string;
  exp: number;
  sub: string;
};

export type CookieSettings = {
  darkTheme: boolean;
};
export type CookieOptions = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};
