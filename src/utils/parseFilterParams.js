const parseContactType = (contactType) => {
  const isString = typeof contactType === "string";
  if (!isString) return;
  const isContactType = (contactType) =>
    ["work", "home", "personal"].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (boolean) => {
  const isString = typeof boolean === "string";
  if (!isString) return;

  return boolean === "true";
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
