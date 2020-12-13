const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const cardList = document.querySelector('.photos__list');
const cardTemplate = document.getElementById('card').content.firstElementChild;
const popupPhoto = document.getElementById('show-photo');
const popupEditProfile = document.getElementById('edit-profile');
const popupAddPlace = document.getElementById('add-place');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const likeCard = (heart) => {
  heart.classList.toggle('photos__like-button-active');
}
//эта функция бкрет карту и реализует ее первой в контейнере
const addCard = (card) => {
  cardList.insertAdjacentElement('afterbegin', card);
}

const deleteCard = (card) => {
  cardList.removeChild(card);
}

const showPhoto = (photo, name) => {
  popupPhoto.querySelector('.form-photos__image').src = photo;
  popupPhoto.querySelector('.form-photos__info').textContent = name;
  showForm(popupPhoto);
}
//эта функция контролирует все кнопки в card
const clickCardHandler = (evt) => {
  const clickClassName = evt.target.className;
  if (clickClassName.startsWith('photos__like-button')){
    evt.preventDefault();
    likeCard(evt.target);
    return ;
  }
  if (clickClassName === 'photos__delete-button'){
    evt.preventDefault();
    deleteCard(evt.currentTarget);
    return ;
  }
  if (clickClassName === 'photos__image'){
    evt.preventDefault();
    showPhoto(evt.target.src, evt.target.parentNode.querySelector('.photos__name').textContent);
  }
}
//пункт 1,функция берет 2 аргумента с name и link и через template вернет карту
const renderCard = (name, link) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.photos__name').textContent = name;
  card.querySelector('.photos__image').src = link;
  card.addEventListener('click', clickCardHandler);
  return card;
} 
//эта функция берет массив карт и делает рендер всех карт в контейнер
const renderCardsArray = (cards) => {
  cards.forEach((card) => {
    const tmp = renderCard(card.name, card.link);
    cardList.appendChild(tmp);

  })
}

//эта функция берет форму и добавляет этот элемент в тело HTML
const showForm = (form) => {
  form.classList.toggle('popup_opened');
}

const saveProfileChanges = () => {
  const fields = popupEditProfile.getElementsByClassName('form__input');
  profileName.textContent = fields[0].value;
  profileHobby.textContent = fields[1].value;
}

const addPlace = () => {
  const fields = popupAddPlace.getElementsByClassName('form__input');
  const card = renderCard(fields[0].value, fields[1].value);
  addCard(card);
}

const personClickHandler = (evt) => {
  const cName = evt.target.className;
  if(cName === 'form__close-btn'){
    evt.preventDefault();
    showForm(popupEditProfile);
    return ;
  }
  if (cName === 'form__save-btn'){
    evt.preventDefault();
    saveProfileChanges();
    showForm(popupEditProfile);
  }
} 

const placeClickHandler = (evt) => {
  const cName = evt.target.className;
  if(cName === 'form__close-btn'){
    evt.preventDefault();
    showForm(popupAddPlace);
    return ;
  }
  if (cName === 'form__save-btn'){
    evt.preventDefault();
    addPlace();
    showForm(popupAddPlace);
  }
}

const editPersonHandler = (evt) => {
  evt.preventDefault();
  const fields = popupEditProfile.getElementsByClassName('form__input');
  fields[0].value = profileName.textContent;
  fields[1].value = profileHobby.textContent;
  showForm(popupEditProfile);
} 

const addPlacehandler = (evt) => {
  evt.preventDefault();
  showForm(popupAddPlace);
}

popupPhoto.addEventListener('click', (evt) => {
  if(evt.target.className === 'form__close-btn'){
    evt.preventDefault();
    showForm(popupPhoto);
  }
})

popupEditProfile.addEventListener('click', personClickHandler);

popupAddPlace.addEventListener('click', placeClickHandler);

document.querySelector('.profile__edit-button').addEventListener('click', editPersonHandler);
document.querySelector('.profile__add-button').addEventListener('click', addPlacehandler)

renderCardsArray(initialCards);
