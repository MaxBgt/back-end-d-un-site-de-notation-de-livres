const express = require("express");
const bookCtrl = require("../controllers/books");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", multer, auth, bookCtrl.createBooks);
router.put("/:id", auth, bookCtrl.modifyBooks);
router.delete("/:id", auth, bookCtrl.deletebooks);
router.get("/bestrating", bookCtrl.bestRatings);
router.get("/:id", bookCtrl.getById);
router.get("/", bookCtrl.getAll);

module.exports = router;
