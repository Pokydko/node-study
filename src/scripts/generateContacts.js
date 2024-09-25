import { createFakeContact } from "../utils/createFakeContact.js";
import { writeContactsAppendFile } from "../utils/writeContactsAppendFile.js";

const generateContacts = async (number) => {
  while (number-- > 0) writeContactsAppendFile(createFakeContact());
};

generateContacts(5);
