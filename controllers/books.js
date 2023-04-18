const Book = require("../models/Book");

exports.createBooks = (req, res, next) => {
  const bookData = JSON.parse(req.body.book);
  const book = new Book({
    ...bookData,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "livre enregistré" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.modifyBooks = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre modifié" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deletebooks = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getById = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.getAll = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.bestRatings = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 3;
  Book.find()
    .sort({ averageRating: -1 })
    .limit(limit)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.rateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const grade = req.body.grade;

    if (grade < 0 || grade > 5) {
      return res.status(400).json({ error: "La note doit être en 0 et 5" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }

    const ratingIndex = book.ratings.findIndex(
      (rating) => rating.userId === userId
    );
    if (ratingIndex !== -1) {
      return res.status(400).json({ error: "Vous avez déjà noté ce livre" });
    }

    book.ratings.push({ userId, grade });

    if (book.ratings.length > 0) {
      const totalRatings = book.ratings.reduce((sum, rating) => {
        if (typeof rating.grade === "number") {
          return sum + rating.grade;
        }
        return sum;
      }, 0);

      book.averageRating = totalRatings / book.ratings.length;
    } else {
      book.averageRating = 0;
    }

    await book.save();
    res.status(200).json({ message: "Note ajoutée correctement", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  console.log(req.body);
};
