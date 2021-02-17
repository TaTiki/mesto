export default class UserInfo {
  constructor({ nameSelector, hobbySelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbyElement = document.querySelector(hobbySelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobby: this._hobbyElement.textContent
    };
  }


  setUser({ name, about, avatar, }){
    this._nameElement.textContent = name;
    this._hobbyElement.textContent = about;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = name;
  }
}
