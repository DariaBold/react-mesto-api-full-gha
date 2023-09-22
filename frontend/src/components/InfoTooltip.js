function InfoTooltip({ onClose, status, isOpen }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form className="popup__form">
          <div
            className={`popup__info ${
              status ? "popup__info-success" : "popup__info-fail"
            }`}
          ></div>
          <p className="popup__info-text">
            {status
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </form>
      </div>
    </div>
  );
}
export default InfoTooltip;
