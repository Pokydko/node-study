import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

const generateContacts = async (number) => {
  let newContacts = [];
  while (number-- > 0) newContacts.push(createFakeContact());

  let existContacts = await readContacts();
  writeContacts(existContacts.concat(newContacts));
};

generateContacts(5);
