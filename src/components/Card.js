export default class Card {
  constructor(
    { likes, _id, name, link, owner },
    { previewFunc, likeFunc, unlikeFunc, deleteFunc }, 
    selector,
  )
  {
    this._id = _id
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._likes = likes.map((user) => (
      user._id
    ))

    this._selector = selector;
    this._previewFunc = previewFunc;
    this._likeFunc = likeFunc;
    this._unlikeFunc = unlikeFunc;
    this._deleteFunc = deleteFunc;
    //this.deleteCard = this.deleteCard.bind(this);
  }

  _getTemplate() {
      const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.photos__card')
      .cloneNode(true);
      
      return cardElement;
  };

  generateCard(myId) {
    this._element = this._getTemplate();
    this._likeButtonElement =  this._element.querySelector('.photos__like-button');
    this._deleteButtonElement = this._element.querySelector('.photos__delete-button');
    this._imageElement = this._element.querySelector('.photos__image');
    this._titleElement =  this._element.querySelector('.photos__name');
    this._likesCountElement = this._element.querySelector('.photos__like-count');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likesCountElement.textContent = this._likes.length;

    this._isLiked = this._likes.some((id) => (
      id === myId
    ))
    if (this._isLiked){
      this._likeButtonElement.classList.add('photos__like-button-active');
    }

    this._isMine = this._ownerId === myId
    if (!this._isMine){
      this._deleteButtonElement.remove();
    }
    
    this._setEventListeners();
  
    return this._element;
  }; 

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      const toggle = this._isLiked ? this._unlikeFunc : this._likeFunc;
      toggle(this._id).then(({ likes }) => {
        this._likesCountElement.textContent = likes.length;
        this._toggleLike();
      }).catch((err) => {
        console.log(err);
      })
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteFunc(this);
      /*this._deleteFunc(this._id).then(() =>{
        this._deleteCard();
      }).catch((err) => {
        console.log(err);
      })*/
    });

    this._imageElement.addEventListener('click', () => {
      this._previewFunc({name: this._name, link: this._link});
    });
  };

  _toggleLike(){
    this._isLiked = !this._isLiked;
    this._likeButtonElement.classList.toggle('photos__like-button-active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
    this._likeButtonElement = null;
    this._deleteButtonElement = null;
    this._imageElement = null;
    this._titleElement = null;
    this._likesCountElement = null;
  };
}
