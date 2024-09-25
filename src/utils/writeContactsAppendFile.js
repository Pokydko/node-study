import fs from "node:fs/promises";
import { PATH_DB } from "../constants/contacts.js";

export const writeContactsAppendFile = async (newContacts) => {
  try {
    await fs.appendFile(PATH_DB, JSON.stringify(newContacts), "utf8");
  } catch (err) {
    console.error("Помилка запису у файл:", err);
  }
};
