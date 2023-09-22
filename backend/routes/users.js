const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUsers, getUsersId, patchUser, patchAvatar, getUserNow,
} = require('../controllers/users');
const patternUrl = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getUserNow);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUsersId);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);
router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(patternUrl),
  }),
}), patchAvatar);

module.exports = router;
