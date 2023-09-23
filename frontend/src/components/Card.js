import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const [isClick, setIsClick] = React.useState(false);
  const [isFinfId, setIsFinfId] = React.useState('');

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
  
  function handleClickTrash() {
    setIsFinfId(card._id);
    setIsClick(true);
  }
  function handleDeleteClick(e) {
    e.preventDefault();
    handleClickClose();
    onCardDelete(isFinfId);
  }
  function handleClickClose() {
    setIsFinfId('');
    setIsClick(false);
  }
  return (
    <> 
    <PopupWithForm
      isOpen={isClick}
      title="Вы уверены?"
      name="question"
      buttonText="Да"
      onSubmit={handleDeleteClick}
      isValid={true}
      onClose={handleClickClose}
    ></PopupWithForm>
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
          onClick={handleClickTrash}
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
    </>
  );
}
export default Card;
