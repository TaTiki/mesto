export default class Card {
  constructor(name,link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate = () => {
      const cardElement = document
      .getElementById('card')
      .content
      .firstElementChild
      .cloneNode(true);
      
      return cardElement;
  }; 

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photos__image').src = this._link;
    this._element.querySelector('.photos__name').textContent = this._name;
  
    return this._element;
  }; 

  _setEventListeners = () => {
    this._element.querySelector('.photos__like-button').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.photos__image').addEventListener('click', () => {
      this._popupPhoto();
    });
  };

  _toggleLike = () => {
    this._element.querySelector('.photos__like-button').classList.toggle('photos__like-button-active');
  }; 

  _deleteCard = () => {
    this._element.remove();
  };

  _popupPhoto = () => {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupInfo.textContent = this._name;
    openPopup(popupPhoto);
  };
}

const popupPhoto = document.getElementById('show-photo');
const popupImage =  popupPhoto.querySelector('.form-photos__image');
const popupInfo =  popupPhoto.querySelector('.form-photos__info');
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

const closeByEscape = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
};

