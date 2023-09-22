import React from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const link = React.useRef();
  const [isValid, setIsValid] = React.useState(false);
  function handleChange(e) {
    const regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      avatar: link.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="popup__input popup__input_type_image"
        id="popup__input-avatar"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        required=""
        ref={link}
        onChange={handleChange}
      />
      <span className="popup__input-avatar-error popup__error "></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
