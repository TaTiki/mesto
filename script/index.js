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
const addPlaceForm = popupAddPlace.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const editProfileName = popupEditProfile.querySelector('#edit-profile-name');
const editProfileHobby =  popupEditProfile.querySelector('#edit-profile-hobby');
const addPlaceName = popupAddPlace.querySelector('#add-place-name');
const addPlaceLink = popupAddPlace.querySelector('#add-place-link');
const popupImage =  popupPhoto.querySelector('.form-photos__image');
const popupInfo =  popupPhoto.querySelector('.form-photos__info');
const profileSubButton = popupEditProfile.querySelector('.form__save-btn');
const profileInputs = popupEditProfile.querySelectorAll('.form__input');
const addPlaceSubButton = popupAddPlace.querySelector('.form__save-btn');
const addPlaceInputs = popupAddPlace.querySelectorAll('.form__input');

const closeByEscape = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

const initForm = (inputList) =>{
  inputList.forEach((input)=>{
    input.classList.remove('form__error');
    input.nextElementSibling.textContent='';
  })
}

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  profileSubButton.classList.remove('form__save-btn-inactive');
  initForm(profileInputs);
  openPopup(popupEditProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addPlaceForm.reset();
  addPlaceSubButton.classList.add('form__save-btn-inactive');
  initForm(addPlaceInputs);
  openPopup(popupAddPlace);
});

document.querySelectorAll('.popup__close-btn').forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.parentNode.parentNode);
  })
});

popupEditProfile.querySelector('.form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(profileSubButton.classList.contains('form__save-btn-inactive')) {
    return
  }
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  closePopup(popupEditProfile);
});


addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(addPlaceSubButton.classList.contains('form__save-btn-inactive')) {
    return
  }
  cardList.prepend(renderCard(addPlaceName.value, addPlaceLink.value));
  closePopup(popupAddPlace);
});

const renderCard = (name, link) => {
  const card = cardTemplate.cloneNode(true);
  const photo = card.querySelector('.photos__image');
  card.querySelector('.photos__name').textContent = name;
  photo.src = link;
  photo.alt = name;
  card.querySelector('.photos__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('photos__like-button-active');
  });
  card.querySelector('.photos__delete-button').addEventListener('click', (evt) => {
    evt.target.parentNode.parentNode.remove();
  });
  photo.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupInfo.textContent = name;
    openPopup(popupPhoto);
  });
  return card;
} 


Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
})

initialCards.forEach((card) => {
  cardList.append(renderCard(card.name, card.link));
})
