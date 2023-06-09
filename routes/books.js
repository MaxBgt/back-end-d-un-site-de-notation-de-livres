const express = require("express");
const bookCtrl = require("../controllers/books");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, multer, bookCtrl.createBooks);
router.put("/:id", auth, multer, bookCtrl.modifyBooks);
router.delete("/:id", auth, bookCtrl.deletebooks);
router.get("/bestrating", bookCtrl.bestRatings);
router.get("/", bookCtrl.getAll);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.get("/:id", bookCtrl.getById);

module.exports = router;
