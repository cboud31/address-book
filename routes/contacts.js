const express = require('express');
const contactsRouter = express.Router();
const verifyToken = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @descr       Get a user's contacts
// @access      Private
contactsRouter.get('/', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.send(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/contacts
// @descr       Create a new contact
// @access      Private
contactsRouter.post(
  '/',
  [verifyToken, [check('name', 'Required field(s) missing').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.send(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/contacts/:id
// @descr       Update a contact
// @access      Private
contactsRouter.put('/:id', verifyToken, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send({ msg: 'Contact not found' });
    }
    // Verify user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: 'Unauthorized Access' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.send(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/contacts/:id
// @descr       Delete a contact
// @access      Private
contactsRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send({ msg: 'Contact not found' });
    }
    // Verify user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: 'Unauthorized Access' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.send({ msg: 'Contact removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = contactsRouter;
