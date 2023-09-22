import React from "react";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function onLogin(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
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
      <p className="login__header">Вход</p>
      <form onSubmit={onLogin} className="login__form">
        <input
          required=""
          className="login__input"
          id="email"
          name="email"
          type="text"
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
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
