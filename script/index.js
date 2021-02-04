import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'; 
import {
  initialCards, 
  profileEditButton,
  addPlaceButton,
} from '../utils/constants.js';

const cardSelector = '#card';

const config = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn-inactive',
  inputErrorClass: 'form__error',
  errorClass: '.form__input-error',
};

const userInfo = new UserInfo('.profile__name', '.profile__hobby');

const popupWithImage = new PopupWithImage('#show-photo');

const cardList = new Section({
  data: initialCards, 
  renderer: (card) => (
    new Card(card, popupWithImage.open, cardSelector).generateCard()
  )
}, '.photos__list');

const popupEditProfile = new PopupWithForm((inputs) => {
  userInfo.setUserInfo({
    name: inputs[0],
    hobby: inputs[1]
  })
}, '#edit-profile');

const popupAddPlace= new PopupWithForm((inputs) => {
  cardList.addItem({ 
    name: inputs[0],
    link: inputs[1],
   });
}, '#add-place');

const editProfileFormValidator = new FormValidator(config, '#edit-profile'); 
const addPlaceFormValidator = new FormValidator(config, '#add-place');

profileEditButton.addEventListener('click' , () => {
  popupEditProfile.open(Object.values(userInfo.getUserInfo()));
  editProfileFormValidator.resetValidation();
});

addPlaceButton.addEventListener('click' , () => {
  popupAddPlace.open();
  addPlaceFormValidator.resetValidation();
});

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

cardList.renderItems();
