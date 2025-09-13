// data/connectTemple.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Temple database already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db('onyekachimmiracle_db_user'); // replace with your Temple DB name
      console.log('✅ Connected to Temple MongoDB');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) throw Error('Temple database not initialized!');
  return _db;
};

module.exports = { initDb, getDb };
