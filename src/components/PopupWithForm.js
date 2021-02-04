import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(submitFunc, selectorPopup) {
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputElements = this._formElement.querySelectorAll('.form__input');
  }

  open(initValues){
    if(initValues) {
      initValues.forEach((value, index) => {
        if(this._inputElements[index]) {
          this._inputElements[index].value = value;
        } 
      });
    }
    super.open();
  }

  close(){
    this._formElement.reset();
    super.close();
  }

  _getInputValues() {
    return Array.from(this._inputElements).map((input) => (
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
