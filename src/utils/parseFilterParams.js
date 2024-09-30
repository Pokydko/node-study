const parseString = (string) => {
  return typeof string === "string" ? string : undefined;
};

// const parseNumber = (number) => {
//   const isString = typeof number === "string";
//   if (!isString) return;
//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) return;
//   return parsedNumber;
// };

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
  const { type, isFavourite, phoneNumber, name, email } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedPhoneNumber = parseString(phoneNumber);
  const parsedName = parseString(name);
  const parsedEmail = parseString(email);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
    phoneNumber: parsedPhoneNumber,
    name: parsedName,
    email: parsedEmail,
  };
};
