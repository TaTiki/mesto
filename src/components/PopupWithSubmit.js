import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(submitFunc, selectorPopup) {
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButtonElement = this._popupElement.querySelector('.form__save-btn');
    this._text = this._submitButtonElement.textContent;
    this._requestErrorElement = this._formElement.querySelector('.form__input-server-error');
    this.open = this.open.bind(this);
  }

  open(item=undefined) {
    if(item) {
     this._item = item;
    }
    super.open();
  }

  close(){
    this._formElement.reset();
    this._requestErrorElement.textContent = "";
    this._requestErrorElement.classList.remove('form__error');
    super.close();
  }

  _submitFuncInput() {
    return this._item;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      let counter = 0;
      const interval = setInterval(() => {
        counter++
        const mod = counter %4
        if (mod === 1){
          this._submitButtonElement.textContent = this._text + '.';
        }else if (mod === 2){
          this._submitButtonElement.textContent = this._text + '..';
        }else if (mod === 3){
          this._submitButtonElement.textContent = this._text + '...';
        }else{
          this._submitButtonElement.textContent = this._text;
        }
      },100)
      this._submitFunc(this._submitFuncInput()).then(() => {
        this.close();
      }).catch(() => {
        this._requestErrorElement.textContent = "Что-то пошло не так,попробуйте снова...";
        this._requestErrorElement.classList.add('form__error');
      }).finally(() => {
        clearInterval(interval);
        this._submitButtonElement.textContent = this._text;
      })
    });
    super.setEventListeners();
  }

}

