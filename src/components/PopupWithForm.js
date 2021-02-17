import PopupWithSubmit from "./PopupWithSubmit.js";

export default class PopupWithForm extends PopupWithSubmit {
  constructor(submitFunc, selectorPopup) {
    super(submitFunc, selectorPopup);
    this._inputElements = this._formElement.querySelectorAll('.form__input');
  }

  open(initValues=undefined){
    if(initValues) {
      initValues.forEach((value, index) => {
        if(this._inputElements[index]) {
          this._inputElements[index].value = value;
        } 
      });
    }
    super.open();
  }

  _submitFuncInput() {
    return Array.from(this._inputElements).map((input) => (
      input.value
    ))
  }
}
