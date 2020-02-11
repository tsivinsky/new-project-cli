// Require router
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(
    "<h1>Hello World!</h1><a href='https://github.com/tsivinsky'>Author</a>"
  );
});

module.exports = router;
