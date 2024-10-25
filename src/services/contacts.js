import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER, DEFAULT_PERPAGE } from "../constants/index.js";
import httpErrors from "http-errors";

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = DEFAULT_PERPAGE,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find()
    .where("userId")
    .equals(userId);
  if (filter.contactType) {
    contactsQuery.where("contactType").equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }
  if (filter.phoneNumber) {
    contactsQuery
      .where("phoneNumber")
      .regex(new RegExp(filter.phoneNumber, "i"));
  }
  if (filter.name) {
    contactsQuery.where("name").regex(new RegExp(filter.name, "i"));
  }
  if (filter.email) {
    contactsQuery.where("email").regex(new RegExp(filter.email, "i"));
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // to stop requesting non-existing page
  if (skip >= contactsCount)
    throw httpErrors(
      404,
      `Contacts not found / Access declined / You reach the end of collection`
    );

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (userId, contactId) => {
  const contact = await ContactsCollection.findById(contactId)
    .where("userId")
    .equals(userId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: payload.contactId, userId: payload.userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (userId, contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });

  return contact;
};
