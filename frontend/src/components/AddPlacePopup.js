import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidSrc, setIsValidSrc] = React.useState(false);

  function handleTitle(e) {
    setTitle(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 30) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }
  function handleLink(e) {
    setLink(e.target.value);
    const regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(e.target.value)) {
      setIsValidSrc(true);
    } else {
      setIsValidSrc(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title,
      link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValidName && isValidSrc}
    >
      <input
        className="popup__input popup__input_type_title"
        id="popup__input-title"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength={2}
        maxLength={30}
        onChange={handleTitle}
        value={title ? title : ""}
      />
      <span className="popup__input-title-error popup__error "></span>
      <input
        className="popup__input popup__input_type_image"
        id="popup__input-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        onChange={handleLink}
        value={link ? link : ""}
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
