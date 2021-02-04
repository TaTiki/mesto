export default class Card {
  constructor({name, link}, previewFunc,selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._previewFunc = previewFunc;
  }

  _getTemplate = () => {
      const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.photos__card')
      .cloneNode(true);
      
      return cardElement;
  }; 

  generateCard = () => {
    this._element = this._getTemplate();
    this._likeButton =  this._element.querySelector('.photos__like-button');
    this._deleteButton = this._element.querySelector('.photos__delete-button');
    this._image = this._element.querySelector('.photos__image');
    this._title =  this._element.querySelector('.photos__name');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._setEventListeners();
  
    return this._element;
  }; 

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._previewFunc({name: this._name, link: this._link});
    });
  };

  _toggleLike = () => {
    this._likeButton.classList.toggle('photos__like-button-active');
  }; 

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
    this._likeButton = null;
    this._deleteButton = null;
    this._image = null;
    this._title = null;
  };
}
