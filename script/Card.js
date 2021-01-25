const PHOTOS_CARD_CLASS = '.photos__card';
const PHOTOS_IMAGE_CLASS = '.photos__image';
const PHOTOS_NAME_CLASS = '.photos__name';
const PHOTOS_LIKE_BUTTON_CLASS = '.photos__like-button';
const PHOTOS_LIKE_BUTTON_ACTIVE = 'photos__like-button-active';
const PHOTOS_DELETE_BUTTON_CLASS = '.photos__delete-button';
const CLICK = 'click';
const POPUP_OPENED = 'popup_opened';
const KEYDOWN = 'keydown';
const ESCAPE_KEY = 'Escape';

export default class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }

  _getTemplate = () => {
      const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(PHOTOS_CARD_CLASS)
      .cloneNode(true);
      
      return cardElement;
  }; 

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(PHOTOS_IMAGE_CLASS).src = this._link;
    this._element.querySelector(PHOTOS_NAME_CLASS).textContent = this._name;
  
    return this._element;
  }; 

  _setEventListeners = () => {
    this._element.querySelector(PHOTOS_LIKE_BUTTON_CLASS).addEventListener(CLICK, () => {
      this._toggleLike();
    });

    this._element.querySelector(PHOTOS_DELETE_BUTTON_CLASS).addEventListener(CLICK, () => {
      this._deleteCard();
    });

    this._element.querySelector(PHOTOS_IMAGE_CLASS).addEventListener(CLICK, () => {
      this._handlePreviewPicture();
    });
  };

  _toggleLike = () => {
    this._element.querySelector(PHOTOS_LIKE_BUTTON_CLASS).classList.toggle(PHOTOS_LIKE_BUTTON_ACTIVE);
  }; 

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreviewPicture = () => {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupInfo.textContent = this._name;
    openPopup(popupPhoto);
  };
}

const popupPhoto = document.querySelector('#show-photo');
const popupImage =  popupPhoto.querySelector('.form-photos__image');
const popupInfo =  popupPhoto.querySelector('.form-photos__info');
export function openPopup (popup) {
  popup.classList.add(POPUP_OPENED);
  document.addEventListener(KEYDOWN, closeByEscape); 
}

const closeByEscape = (evt) => {
  if(evt.key === ESCAPE_KEY ) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

export const closePopup = (popup) => {
  popup.classList.remove(POPUP_OPENED);
  document.removeEventListener(KEYDOWN, closeByEscape); 
};

