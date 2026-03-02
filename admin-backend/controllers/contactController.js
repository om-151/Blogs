const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

// public: create a contact message
const createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are required");
  }
  const contact = await Contact.create({ name, email, message });
  res.status(201).json(contact);
});

// admin: get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// admin: delete contact by id
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact removed" });
});

module.exports = { createContact, getContacts, deleteContact };
