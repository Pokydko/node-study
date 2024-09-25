import { readContacts } from "./readContacts.js";

export const readContactsAsArray = async () => {
  let data = await readContacts();
  if (data === "" || data === `\n`) return [];

  try {
    data = "[" + data.replaceAll("}{", "},{") + "]";
    data = JSON.parse(data);
  } catch (e) {
    console.error("Error during parsing json:", e);
    data = [];
  }

  return data;
};
