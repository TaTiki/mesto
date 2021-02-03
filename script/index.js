import Card,{openPopup,closePopup} from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

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

const popupWithImage = new PopupWithImage('#show-photo');
popupWithImage.setEventListeners();

//const cardList = document.querySelector('.photos__list');
const cardList = new Section({
  data: initialCards, 
  renderer: (card) => (
    new Card(card, popupWithImage.open, cardSelector).generateCard()
  )
}, '.photos__list');

//const popupEditProfile = document.querySelector('#edit-profile');
//const popupEditProfile = new Popup('#edit-profile');
//popupEditProfile.setEventListeners();
//const popupAddPlace = document.querySelector('#add-place');
//const popupAddPlace = new Popup('#add-place');
//popupAddPlace.setEventListeners();
const addPlaceForm = document.querySelector('#add-place').querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const editProfileName = document.querySelector('#edit-profile').querySelector('#edit-profile-name');
const editProfileHobby =  document.querySelector('#edit-profile').querySelector('#edit-profile-hobby');
const addPlaceName = document.querySelector('#add-place').querySelector('#add-place-name');
const addPlaceLink = document.querySelector('#add-place').querySelector('#add-place-link');
const profileEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');
const editProfileForm = document.querySelector('#edit-profile').querySelector('.form');

const popupEditProfile = new PopupWithForm((inputs) => {
  profileName.textContent = inputs[0];
  profileHobby.textContent = inputs[1]; 
}, '#edit-profile');
popupEditProfile.setEventListeners();

const popupAddPlace= new PopupWithForm((inputs) => {
  cardList.addItem({ 
    name: inputs[0],
    link: inputs[1],
   });
}, '#ad-place');
popupAddPlace.setEventListeners();

const editProfileFormValidator = new FormValidator(config, '#edit-profile'); 
const addPlaceFormValidator = new FormValidator(config, '#add-place');

profileEditButton.addEventListener('click' , () => {
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  editProfileFormValidator.resetValidation();
//  openPopup(popupEditProfile);
  popupEditProfile.open();
});

addPlaceButton.addEventListener('click' , () => {
  //addPlaceForm.reset();
  addPlaceFormValidator.resetValidation();
  //openPopup(popupAddPlace);
  popupAddPlace.open();
});

/*closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  })
});*/

/*editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
//  closePopup(popupEditProfile);
  popupEditProfile.close();
});*/

/*addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
 // cardList.prepend(new Card(addPlaceName.value, addPlaceLink.value, cardSelector).generateCard());
 cardList.addItem({ 
  name: addPlaceName.value,
  link: addPlaceLink.value,
 });
  //closePopup(popupAddPlace);
  popupAddPlace.close();
});*/ 

/*Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});*/

/*initialCards.forEach((card) => {
  cardList.append(new Card(card.name, card.link, cardSelector).generateCard());
});*/

cardList.renderItems();

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();