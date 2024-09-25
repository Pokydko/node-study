import { readContactsAsArray } from "../utils/readContactsAsArray.js";
import { writeContacts } from "../utils/writeContacts.js";

export const removeLastContact = async () => {
  let actualContacts = await readContactsAsArray();
  if (actualContacts.length > 0) actualContacts.pop();
  writeContacts(actualContacts);
};

removeLastContact();
