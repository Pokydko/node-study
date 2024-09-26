import express from "express";
import pino from "pino-http"; // Логування запитів
import cors from "cors";
import { mongoose } from "mongoose";
import { getAllContacts, getContactById } from "./services/contacts.js";

import { env } from "./utils/env.js";
const PORT = Number(env("PORT", "3000"));

export const setupServer = () => {
  const app = express();
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );
  app.use(express.json());
  app.use(cors());

  //
  app.get("/contacts", async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get("/contacts/:contactId", async (req, res) => {
    const param = req.params["contactId"];
    // if (!mongoose.Types.ObjectId.isValid(param)) {
    //   return res.status(400).json({
    //     message: "Invalid contact ID format.", (It must be a 24 character for MangoDB).
    //   });
    // }
    const contactId = new mongoose.Types.ObjectId(param);
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: "Contact not found",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });
  //

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
