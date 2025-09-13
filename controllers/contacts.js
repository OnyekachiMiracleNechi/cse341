const { ObjectId } = require('mongodb');
const mongodb = require('../data/connect');

// --------------------
// GET all contacts
// --------------------
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------
// GET single contact
// --------------------
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------
// CREATE a new contact
// --------------------
const createContact = async (req, res) => {
  try {
    const doc = req.body;

    // Validate required fields
    const required = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
    const missing = required.filter(k => !doc[k]);
    if (missing.length) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    }

    const result = await mongodb.getDb().collection('contacts').insertOne(doc);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // --------------------
// // UPDATE a contact
// // --------------------
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

    const update = { $set: req.body };
    const result = await mongodb.getDb().collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      update
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // --------------------
// // DELETE a contact
// // --------------------
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });

    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
