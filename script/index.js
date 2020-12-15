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
const editProfileName = popupEditProfile.querySelector('#edit-profile-name');
const editProfileHobby =  popupEditProfile.querySelector('#edit-profile-hobby');
const addPlaceName = popupAddPlace.querySelector('#add-place-name');
const addPlaceLink = popupAddPlace.querySelector('#add-place-link');
const popupImage =  popupPhoto.querySelector('.form-photos__image');
const popupInfo =  popupPhoto.querySelector('.form-photos__info');


//эта функция берет форму и добавляет этот элемент в тело HTML
const showForm = (form) => {
  form.classList.add('popup_opened');
}

const hideForm = (form) => {
  form.classList.remove('popup_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', (evt) => {
  evt.preventDefault();
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  showForm(popupEditProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', (evt) => {
  evt.preventDefault();
  addPlaceName.value = '';
  addPlaceLink.value = '';
  showForm(popupAddPlace);
});

document.querySelectorAll('.form__close-btn').forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideForm(evt.target.parentNode.parentNode.parentNode);
  })
});

popupEditProfile.querySelector('.form__save-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  hideForm(popupEditProfile);
});

popupAddPlace.querySelector('.form__save-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  cardList.prepend(renderCard(addPlaceName.value, addPlaceLink.value));
  hideForm(popupAddPlace);
});

//пункт 1,функция берет 2 аргумента с name и link и через template вернет карту
const renderCard = (name, link) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.photos__name').textContent = name;
  card.querySelector('.photos__image').src = link;
  card.addEventListener('click', (evt) => {
    const clickClassName = evt.target.className;
    if (clickClassName.startsWith('photos__like-button')){
      evt.preventDefault();
      evt.target.classList.toggle('photos__like-button-active');
      return ;
    }
    if (clickClassName === 'photos__delete-button'){
      evt.preventDefault();
      evt.currentTarget.remove();
      return ;
    }
    if (clickClassName === 'photos__image'){
      evt.preventDefault();
      const text = evt.target.parentNode.querySelector('.photos__name').textContent;
      popupImage.src = evt.target.src;
      popupImage.alt = text;
      popupInfo.textContent =  text;
      showForm(popupPhoto);
    }
  });
  return card;
} 

initialCards.forEach((card) => {
  cardList.append(renderCard(card.name, card.link));
})
