class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers:{ 
        "Authorization": `Bearer ${token}`}
    }).then(this._getResponseData);
  }
  setUserInfo(info,token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        about: info.description,
      }),
    }).then(this._getResponseData);
  }
  setUserAvatar(urlAvatar,token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: urlAvatar.avatar,
      }),
    }).then(this._getResponseData);
  }
  addCard(info,token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        link: info.link,
      }),
    }).then(this._getResponseData);
  }
  deleteCard(cardId,token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  putLike(cardId,token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
  deleteLike(cardId,token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}
const api = new Api({
  baseUrl: "http://localhost:3000",
});
export default api;
