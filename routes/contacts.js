const express = require('express');
const contactsRouter = express.Router();

// @route       GET api/contacts
// @descr       Get a user's contacts
// @access      Private
contactsRouter.get('/', (req, res) => {
  res.send(`Get a user's contacts`);
});

// @route       POST api/contacts
// @descr       Create a new contact
// @access      Private
contactsRouter.post('/', (req, res) => {
  res.send(`Create a new contact`);
});

// @route       PUT api/contacts/:id
// @descr       Update a contact
// @access      Private
contactsRouter.put('/:id', (req, res) => {
  res.send(`Update a contact`);
});

// @route       DELETE api/contacts/:id
// @descr       Delete a contact
// @access      Private
contactsRouter.delete('/:id', (req, res) => {
  res.send(`Delete a contact`);
});

module.exports = contactsRouter;
