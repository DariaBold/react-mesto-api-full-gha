import React from "react";
import { Link } from "react-router-dom";

function Register({ register }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  function onRegister(e) {
    e.preventDefault();
    register(formValue.email, formValue.password);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return (
    <div className="login">
      <p className="login__header">Регистрация</p>
      <form onSubmit={onRegister} className="login__form">
        <input
          required=""
          className="login__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          required=""
          id="password"
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Зарегистрироваться
          </button>
        </div>
        <div className="login__signin-container">
          <p>
            Уже зарегистрированы?
            <Link to={"/sign-in"} className="login__signin">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
