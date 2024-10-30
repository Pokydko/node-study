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
  console.log(["work", "home", "personal"].includes(contactType.toLowerCase()));
  console.log(contactType);

  return ["work", "home", "personal"].includes(contactType.toLowerCase())
    ? contactType
    : undefined;
};

const parseBoolean = (boolean) => {
  const isString = typeof boolean === "string";
  if (!isString) return;

  return boolean === "true";
};

export const parseFilterParams = (query) => {
  console.log(query);
  const { contactType, isFavourite, phoneNumber, name, email } = query;

  const parsedContactType = parseContactType(contactType);
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
