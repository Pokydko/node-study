import { PATH_DB } from "../constants/contacts.js";
import fs from "node:fs/promises";

export const readContacts = async () => {
  let data;
  try {
    await fs.access(PATH_DB);
    data = await fs.readFile(PATH_DB, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Файл або каталог '${PATH_DB}' не існує.`);
    } else {
      console.error(
        `Помилка доступності або читання файлу/каталогу '${PATH_DB}':`,
        err
      );
    }
  }

  if (data === "" || data === `\n`) return [];

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.error("Error during parsing json:", e);
    data = [];
  }

  return data;
};
