import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidDescription, setIsValidDescription] = React.useState(false);

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 40) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 200) {
      setIsValidDescription(true);
    } else {
      setIsValidDescription(false);
    }
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      description,
    });
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValidDescription && isValidName}
    >
      <input
        className="popup__input popup__input_type_name"
        id="popup__input-name"
        type="text"
        placeholder="Введите имя"
        name="name"
        required=""
        minLength={2}
        maxLength={40}
        onChange={handleChangeName}
        value={name ? name : ""}
      />
      <span className="popup__input-title-error popup__error "></span>
      <input
        className="popup__input popup__input_type_description"
        id="popup__input-description"
        type="text"
        placeholder="Описание"
        name="description"
        required=""
        minLength={2}
        maxLength={200}
        onChange={handleChangeDescription}
        value={description ? description : ""}
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
