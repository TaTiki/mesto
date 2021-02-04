import {ESCAPE_KEY} from '../utils/constants.js';

export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
   
  }
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose({key}) {
    if (key === ESCAPE_KEY) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-btn')
    .addEventListener('click', () => { this.close() })
    this._popupElement.addEventListener('click', ({target}) => {
      if(target.classList.contains('popup')){
        this.close();
      }
    })
  }
}
