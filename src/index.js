//import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js'; 
import Api from './communication/Api.js';
import {
  initialCards, 
  profileEditButton,
  addPlaceButton,
} from './utils/constants.js';

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    'authorization': '6577e49f-15b9-4798-93b6-109a6b031458',
    'Content-Type': 'application/json'
  }
})

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

api.getInitialCards().then(res => console.log(res)).catch(err => console.log(err))
/*api.getInitialCards()
.then((initialCards) => {
  const cardList = new Section({
    data: initialCards, 
    renderer: (card) => (
      new Card(card, popupWithImage.open, cardSelector).generateCard()
    )
  }, '.photos__list');
  cardList.renderItems();
})*/

//cardList.renderItems();
