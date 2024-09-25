import { PATH_DB } from "../constants/contacts.js";
import fs from "node:fs/promises";

export const writeContacts = async (updatedContacts) => {
  try {
    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts).slice(1, -1),
      "utf8"
    );
  } catch (err) {
    console.error("Помилка запису у файл:", err);
  }
};
