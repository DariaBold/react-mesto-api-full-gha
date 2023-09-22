import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;
  const counterLikes = card.likes.length;

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  return (
    <article className="elements__card">
      <img
        className="elements__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="elements__trash"
          type="button"
          name="trash"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="elements__text">
        <h2 className="elements__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          name="like"
          aria-label="Нравится"
          onClick={handleLikeClick}
        ></button>
        <span className="elements__counter">{counterLikes}</span>
      </div>
    </article>
  );
}
export default Card;
