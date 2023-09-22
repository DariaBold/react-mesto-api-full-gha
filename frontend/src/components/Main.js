import React from "react";

import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar"
          onClick={onEditAvatar}
        >
          <img
            className="profile__photo"
            alt="фото профиля"
            src={currentUser.avatar}
          />
        </button>
        <div className="profile__text">
          <div className="profile__container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="Добавить"
          name="add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((info) => {
          return (
            <Card
              card={info}
              key={info._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
