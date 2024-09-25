import { readContactsAsArray } from "../utils/readContactsAsArray.js";

export const countContacts = async () => {
  const arr = await readContactsAsArray();
  return arr.length;
};

console.log(await countContacts());
