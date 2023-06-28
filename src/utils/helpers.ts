import { Expense } from "../types";

export const getExpenseType = (exp: Expense): string =>
  exp.isHardware ? "hardware" : exp.type;

const isNumber = (val: unknown) => {
  const pattern = /^\d+\.?\d*$/;
  return pattern.test(val as string);
};

export const getFormValue = (
  val: FormDataEntryValue
): string | boolean | number | FormDataEntryValue => {
  if (isNumber(val)) {
    return Number(val);
  } else if (val === "on") {
    return true;
  } else if (val === "off") {
    return false;
  }
  return val;
};

export const barColors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export const getErrorMessage = (status: number, text = "") => {
  switch (status) {
    case 204:
      return `The server responded with empty content, ${status} ${
        text ? `(${text})` : ""
      }`;
    case 401:
      return `An error occured while trying to fetch data: Unauthorized request, ${status} ${
        text ? `(${text})` : ""
      }`;
    case 403:
      return `An error occured while trying to fetch data: Forbidden request, ${status} ${
        text ? `(${text})` : ""
      }`;
    case 404:
      return `Resource not found: ${status} ${text ? `(${text})` : ""}`;
    case 500:
      return `An error occured while trying to fetch data: Internal server error, ${status} ${
        text ? `(${text})` : ""
      }`;
    default:
      return "Something went wrong";
  }
};
