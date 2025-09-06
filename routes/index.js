const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello, World!");
});

router.get('/', (req, res) => {
  res.send('Welcome to the Contacts API 🚀');
});

module.exports = router;