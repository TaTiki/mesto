import Card,{openPopup,closePopup} from './card.js';
import FormValidator from './formValidator.js';

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
const popupEditProfile = document.getElementById('edit-profile');
const popupAddPlace = document.getElementById('add-place');
const addPlaceForm = popupAddPlace.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const editProfileName = popupEditProfile.querySelector('#edit-profile-name');
const editProfileHobby =  popupEditProfile.querySelector('#edit-profile-hobby');
const addPlaceName = popupAddPlace.querySelector('#add-place-name');
const addPlaceLink = popupAddPlace.querySelector('#add-place-link');
const profileSubButton = popupEditProfile.querySelector('.form__save-btn');
const profileInputs = popupEditProfile.querySelectorAll('.form__input');
const addPlaceSubButton = popupAddPlace.querySelector('.form__save-btn');
const addPlaceInputs = popupAddPlace.querySelectorAll('.form__input');

const initForm = (inputList) =>{
  inputList.forEach((input)=>{
    input.classList.remove('form__error');
    input.nextElementSibling.textContent='';
  })
};

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
    return;
  }
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  closePopup(popupEditProfile);
});


addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(addPlaceSubButton.classList.contains('form__save-btn-inactive')) {
    return;
  }
  cardList.prepend(new Card(addPlaceName.value, addPlaceLink.value).generateCard());
  closePopup(popupAddPlace);
}); 

Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});

initialCards.forEach((card) => {
  cardList.append(new Card(card.name, card.link).generateCard());
});

const config = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn-inactive',
  inputErrorClass: 'form__error',
};

new FormValidator(config, '#edit-profile').enableValidation();
new FormValidator(config, '#add-place').enableValidation();
