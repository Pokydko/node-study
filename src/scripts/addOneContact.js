import { createFakeContact } from "../utils/createFakeContact.js";
import { writeContactsAppendFile } from "../utils/writeContactsAppendFile.js";

export const addOneContact = async () => {
  writeContactsAppendFile(createFakeContact());
};

addOneContact();
