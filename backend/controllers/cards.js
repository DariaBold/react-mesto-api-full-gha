const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
module.exports.deleteCardId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Это карточка другого участника.'));
      }
      Card.deleteOne(card)
        .orFail()
        .then(() => { res.send({ message: 'Это карточка удалена.' }); })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректный _id карточки.'));
          } else if (err.name === 'DocumentNotFoundError') {
            next(new NotFoundError('Карточка по указанному _id не найдена.'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный _id карточки.'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найден.'));
      } else {
        next(err);
      }
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный _id карточки.'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      } else {
        next(err);
      }
    });
};
