import { DEFAULT_PERPAGE } from "../constants/index.js";

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, DEFAULT_PERPAGE);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

const parseNumber = (number, defaultValue) => {
  const isString = typeof number === "string";
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};
