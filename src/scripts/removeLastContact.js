import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const removeLastContact = async () => {
  let actualContacts = await readContacts();
  if (actualContacts.length > 0) actualContacts.pop();
  writeContacts(actualContacts);
};

removeLastContact();
