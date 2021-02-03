import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor(submitFunc, selectorPopup) {
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._formElement = this._popupElement.querySelector('.form');
  }

  close(){
    this._formElement.reset();
    super.close();
  }

  _getInputValues() {
    return this._formElement.querySelectorAll('.form__input').map((input) => (
      input.value
    ))
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunc(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
