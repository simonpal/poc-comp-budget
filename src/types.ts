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
};
// {
//   "iss": "https://accounts.google.com",
//   "nbf": 1687173888,
//   "aud": "491406548974-slq1dkq4ck83rvfmsbqe2uehssbqd4ac.apps.googleusercontent.com",
//   "sub": "114992878981779564245",
//   "hd": "tretton37.com",
//   "email": "simon.palmberg@tretton37.com",
//   "email_verified": true,
//   "azp": "491406548974-slq1dkq4ck83rvfmsbqe2uehssbqd4ac.apps.googleusercontent.com",
//   "name": "Simon Palmberg",
//   "picture": "https://lh3.googleusercontent.com/a/AAcHTtf3En0HxqzzgYyIvZ7TCwSpMAGQQn5QTdbIYQ_x=s96-c",
//   "given_name": "Simon",
//   "family_name": "Palmberg",
//   "iat": 1687174188,
//   "exp": 1687177788,
//   "jti": "fa369576fbb0033b0577771d751d7676eb5ca75b"
// }
