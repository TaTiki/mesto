const cardList = document.querySelector('.photos__list');
const cardTemplate = document.getElementById('card').content.firstElementChild;
const bigForm = document.getElementById('big-photos').content.firstElementChild;

bigForm.addEventListener('click', (evt) => {
  if(evt.target.className === 'form__close-btn'){
    evt.preventDefault();
    hideForm();
  }
})

const likeCard = (heart) => {
  heart.classList.toggle('photos__like-button-active');
}

const addCard = (card) => {
  cardList.insertAdjacentElement('afterbegin', card);
}

const deleteCard = (card) => {
  cardList.removeChild(card);
}

const showPhoto = (photo, name) => {
  bigForm.querySelector('.form-photos__image').src = photo;
  bigForm.querySelector('.form-photos__info').textContent = name;
  showForm(bigForm);
}

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

const renderCard = (name, link) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.photos__name').textContent = name;
  card.querySelector('.photos__image').src = link;
  return card;
} 

const renderCardsArray = (cards) => {
  cards.forEach((card) => {
    const tmp = renderCard(card.name, card.link);
    tmp.addEventListener('click', clickCardHandler);
    cardList.appendChild(tmp);

  })
}

const formTemplate = document.getElementById('form').content.firstElementChild;
const page = document.querySelector('.page');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const showForm = (form) => {
  page.appendChild(form);
}

const hideForm = () => {
  page.removeChild(document.getElementById('popup'));
}

const saveProfileChanges = (form) => {
  profileName.textContent = form.querySelector('#first').value;
  profileHobby.textContent = form.querySelector('#second').value;
}

const addPlace = (form) => {
  const card = renderCard(form.querySelector('#first').value, form.querySelector('#second').value);
  card.addEventListener('click', clickCardHandler);
  addCard(card);
}

const personClickHandler = (evt) => {
  const cName = evt.target.className;
  if(cName === 'form__close-btn'){
    evt.preventDefault();
    hideForm();
    return ;
  }
  if (cName === 'form__save-btn'){
    evt.preventDefault();
    saveProfileChanges(evt.target.parentNode);
    hideForm();
  }
} 

const placeClickHandler = (evt) => {
  const cName = evt.target.className;
  if(cName === 'form__close-btn'){
    evt.preventDefault();
    hideForm();
    return ;
  }
  if (cName === 'form__save-btn'){
    evt.preventDefault();
    addPlace(evt.target.parentNode);
    hideForm();
  }
}

const prepareEditPersonForm = () => {
  const form = formTemplate.cloneNode(true);
  form.querySelector('.form__header').textContent = 'Редактировать профиль';
  form.querySelector('.form__save-btn').textContent = 'Сохранить';
  form.querySelector('#first').value = profileName.textContent;
  form.querySelector('#second').value = profileHobby.textContent;
  form.addEventListener('click', personClickHandler);
  return (form);
}

const prepareAddPlaceForm = () => {
  const form = formTemplate.cloneNode(true);
  form.querySelector('.form__header').textContent = 'Новое место';
  form.querySelector('.form__save-btn').textContent = 'Создать';
  form.querySelector('#first').placeholder = 'Название';
  form.querySelector('#second').placeholder = 'Ссылка на картинку';
  form.addEventListener('click', placeClickHandler);
  return (form);
}

const editPersonHandler = (evt) => {
  evt.preventDefault();
  showForm(prepareEditPersonForm());
} 

const addPlacehandler = (evt) => {
  evt.preventDefault();
  showForm(prepareAddPlaceForm());
}

document.querySelector('.profile__edit-button').addEventListener('click', editPersonHandler);
document.querySelector('.profile__add-button').addEventListener('click', addPlacehandler)


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

renderCardsArray(initialCards);

