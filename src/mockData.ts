import { Category, Expense } from "./types";

// export const users: User[] = [
//   {
//     name: 'Simon',
//     id: '1234',
//     start: '2018-09-01',
//     image: 'https://picsum.photos/seed/picsum/200/',
//     openingBalanceMoney: 18000,
//     openingBalanceTime: 40,
//     yearlyRefill: 10000,
//     comment: 'Admin comment',
//     hardwareBudget: 3500,
//     currentTimeBalance: 37,
//     currentMoneyBalance: 17850,
//     currentHardwareBalance: 750,
//   },
//   {
//     name: 'Anders',
//     id: '12345',
//     start: '2019-09-01',
//     image: 'https://picsum.photos/seed/picsum/200/',
//     openingBalanceMoney: 18000,
//     openingBalanceTime: 40,
//     yearlyRefill: 10000,
//     comment: 'Admin comment',
//     hardwareBudget: 3500,
//     currentTimeBalance: 37,
//     currentMoneyBalance: 17850,
//     currentHardwareBalance: 750,
//   },
//   {
//     name: 'Remi',
//     id: '123456',
//     start: '2020-09-01',
//     image: 'https://picsum.photos/seed/picsum/200/',
//     openingBalanceMoney: 18000,
//     openingBalanceTime: 40,
//     yearlyRefill: 10000,
//     comment: 'Admin comment',
//     hardwareBudget: 3500,
//     currentTimeBalance: 37,
//     currentMoneyBalance: 17850,
//     currentHardwareBalance: 750,
//   },
// ];

export const myExpenses: Expense[] = [
  {
    id: "0",
    userId: "1234",
    date: "2022-05-10",
    type: "money",
    sum: 2500,
    name: "M-store",
    isHardware: true,
    comment: "Phone upgrade",
    category: "Phone upgrade"
  },
  {
    id: "1",
    userId: "1234",
    date: "2023-05-10",
    type: "money",
    sum: 2500,
    name: "M-store",
    isHardware: true,
    comment: "Phone upgrade",
    category: "Phone upgrade"
  },
  {
    id: "2",
    userId: "1234",
    date: "2023-04-26",
    type: "time",
    sum: 3,
    name: "Conference",
    isHardware: false,
    comment: "NordicJS",
    category: "Conference"
  },
  {
    id: "3",
    userId: "1234",
    date: "2023-01-02",
    type: "money",
    sum: 350,
    name: "Cource",
    isHardware: false,
    comment: "Udemy",
    category: "Course"
  },
  {
    id: "4",
    userId: "12345",
    date: "2023-05-02",
    type: "money",
    sum: 1700,
    name: "M-store",
    isHardware: true,
    comment: "Phone upgrade",
    category: "Phone upgrade"
  },
  {
    id: "5",
    userId: "12345",
    date: "2023-03-26",
    type: "time",
    sum: 3,
    name: "Conference",
    isHardware: false,
    comment: "NordicJS",
    category: "Conference"
  },
  {
    id: "5",
    userId: "123456",
    date: "2023-03-26",
    type: "time",
    sum: 8,
    name: "Conference",
    isHardware: false,
    comment: "NordicJS",
    category: "Conference"
  },
  {
    id: "6",
    userId: "123456",
    date: "2023-03-26",
    type: "money",
    sum: 5000,
    name: "Conference",
    isHardware: false,
    comment: "NordicJS",
    category: "Conference"
  }
];
export const categories: Category[] = [
  { id: "1", name: "Conference" },
  { id: "2", name: "Course" },
  { id: "3", name: "Phone upgrade" },
  { id: "4", name: "Computer upgrade" },
  { id: "5", name: "Headphones" },
  { id: "6", name: "Keyboard" },
  { id: "7", name: "Mouse" },
  { id: "8", name: "Books" },
  { id: "9", name: "Accessories" },
  { id: "10", name: "Other" }
];
