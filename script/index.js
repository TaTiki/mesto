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

const PROFILE_EDIT_BUTTON_CLASS = '.profile__edit-button';
const CLICK = 'click';
const FORM_SAVE_BUTTON_INACTIVE = 'form__save-btn-inactive';
const PROFILE_ADD_BUTTON_CLASS = '.profile__add-button';
const POPUP_CLOSE_BUTTON_CLASS = '.popup__close-btn';
const POPUP_CLASS = '.popup';
const FORM_CLASS = '.form';
const SUBMIT = 'submit';
const POPUP = 'popup';
const CARD_ID = '#card';

const config = {
  formSelector: FORM_CLASS,
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: FORM_SAVE_BUTTON_INACTIVE,
  inputErrorClass: 'form__error',
};

const cardList = document.querySelector('.photos__list');
const popupEditProfile = document.getElementById('edit-profile');
const popupAddPlace = document.getElementById('add-place');
const addPlaceForm = popupAddPlace.querySelector(FORM_CLASS);
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const editProfileName = popupEditProfile.querySelector('#edit-profile-name');
const editProfileHobby =  popupEditProfile.querySelector('#edit-profile-hobby');
const addPlaceName = popupAddPlace.querySelector('#add-place-name');
const addPlaceLink = popupAddPlace.querySelector('#add-place-link');
const profileSubButton = popupEditProfile.querySelector('.form__save-btn');
const addPlaceSubButton = popupAddPlace.querySelector('.form__save-btn');
const editProfileFormValidator = new FormValidator(config, '#edit-profile'); 
const addPlaceFormValidator = new FormValidator(config, '#add-place');


document.querySelector(PROFILE_EDIT_BUTTON_CLASS).addEventListener(CLICK , () => {
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  profileSubButton.classList.remove(FORM_SAVE_BUTTON_INACTIVE);
  editProfileFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

document.querySelector(PROFILE_ADD_BUTTON_CLASS).addEventListener(CLICK , () => {
  addPlaceForm.reset();
  addPlaceSubButton.classList.add(FORM_SAVE_BUTTON_INACTIVE);
  addPlaceFormValidator.resetValidation();
  openPopup(popupAddPlace);
});

document.querySelectorAll(POPUP_CLOSE_BUTTON_CLASS).forEach((button) => {
  button.addEventListener(CLICK , (evt) => {
    closePopup(evt.target.closest(POPUP_CLASS));
  })
});

popupEditProfile.querySelector(FORM_CLASS).addEventListener(SUBMIT, (evt) => {
  evt.preventDefault();
  if(profileSubButton.classList.contains(FORM_SAVE_BUTTON_INACTIVE)) {
    return;
  }
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  closePopup(popupEditProfile);
});


addPlaceForm.addEventListener(SUBMIT, (evt) => {
  evt.preventDefault();
  if(addPlaceSubButton.classList.contains(FORM_SAVE_BUTTON_INACTIVE)) {
    return;
  }
  cardList.prepend(new Card(addPlaceName.value, addPlaceLink.value, CARD_ID).generateCard());
  closePopup(popupAddPlace);
}); 

Array.from(document.querySelectorAll(POPUP_CLASS)).forEach((popup) => {
  popup.addEventListener(CLICK , (evt) => {
    if(evt.target.classList.contains(POPUP)) {
      closePopup(popup);
    }
  })
});

initialCards.forEach((card) => {
  cardList.append(new Card(card.name, card.link, CARD_ID).generateCard());
});

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();