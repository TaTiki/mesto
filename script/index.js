import Card,{openPopup,closePopup} from './Card.js';
import FormValidator from './FormValidator.js';

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

const config = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn-inactive',
  inputErrorClass: 'form__error',
  errorClass: '.form__input-error',
};

const cardSelector = '#card';

const cardList = document.querySelector('.photos__list');
const popupEditProfile = document.querySelector('#edit-profile');
const popupAddPlace = document.querySelector('#add-place');
const addPlaceForm = popupAddPlace.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const editProfileName = popupEditProfile.querySelector('#edit-profile-name');
const editProfileHobby =  popupEditProfile.querySelector('#edit-profile-hobby');
const addPlaceName = popupAddPlace.querySelector('#add-place-name');
const addPlaceLink = popupAddPlace.querySelector('#add-place-link');
const profileEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');
const editProfileForm = popupEditProfile.querySelector('.form');

const editProfileFormValidator = new FormValidator(config, '#edit-profile'); 
const addPlaceFormValidator = new FormValidator(config, '#add-place');

profileEditButton.addEventListener('click' , () => {
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  editProfileFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

addPlaceButton.addEventListener('click' , () => {
  addPlaceForm.reset();
  addPlaceFormValidator.resetValidation();
  openPopup(popupAddPlace);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  })
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  closePopup(popupEditProfile);
});

addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardList.prepend(new Card(addPlaceName.value, addPlaceLink.value, cardSelector).generateCard());
  closePopup(popupAddPlace);
}); 

Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});

initialCards.forEach((card) => {
  cardList.append(new Card(card.name, card.link, cardSelector).generateCard());
});

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();