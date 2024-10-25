import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from "../services/contacts.js";
import httpErrors from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
  const userId = req.user._id;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(req.user._id, contactId);
  if (!contact) {
    throw httpErrors(404, "Contact not found / Access declined");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  let contactData = { ...req.body, userId: req.user._id };

  const photo = req.file;
  if (photo) {
    let photoUrl;
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch (error) {
      throw httpErrors(500, `Cloudinary error. ${error}`);
    }
    contactData = { ...contactData, photo: photoUrl };
  }

  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  let contactData = {
    ...req.body,
    userId: req.user._id,
    contactId: req.params.contactId,
  };

  const photo = req.file;
  if (photo) {
    let photoUrl;
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch (error) {
      throw httpErrors(500, `Cloudinary error. ${error}`);
    }
    contactData = { ...contactData, photo: photoUrl };
  }

  const result = await updateContact(contactData);

  if (!result) {
    throw httpErrors(404, "Contact not found / Access declined");
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(req.user._id, contactId);

  if (!contact) {
    throw httpErrors(403, `Contact not found / Access declined`);
  }

  res.status(204).send();
};
