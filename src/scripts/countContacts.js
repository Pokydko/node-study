import { readContacts } from "../utils/readContacts.js";

export const countContacts = async () => {
  const arr = await readContacts();
  return arr.length;
};

console.log(await countContacts());
