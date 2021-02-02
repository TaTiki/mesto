import {ESCAPE_KEY} from '../utils/constants.js';

export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleClickOutsideContent);
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
  _handleClickOutsideContent({target}) {
    if(target.classList.contains('popup')){
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-btn')
    .addEventListener('click', () => { this.close() })
  }
}

/*popup.classList.add('popup_opened');
document.addEventListener('keydown', closeByEscape); 

const closeByEscape = (evt) => {
  if(evt.key === ESCAPE_KEY ) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});*/