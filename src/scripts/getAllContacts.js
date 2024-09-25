import { readContactsAsArray } from "../utils/readContactsAsArray.js";

export const getAllContacts = async () => {
  return await readContactsAsArray();
};

console.log(await getAllContacts());
