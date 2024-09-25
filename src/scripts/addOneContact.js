import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const addOneContact = async () => {
  let existContacts = await readContacts();
  existContacts.push(createFakeContact());

  writeContacts(existContacts);
};

addOneContact();
