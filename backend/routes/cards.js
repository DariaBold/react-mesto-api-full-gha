const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards, createCards, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');
const patternUrl = require('../utils/constants');

router.get('/', getCards);
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(patternUrl).required(),
  }),
}), createCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardId);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
