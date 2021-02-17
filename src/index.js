import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import UserInfo from './components/UserInfo.js'; 
import Api from './communication/Api.js';
import {
  profileEditButton,
  addPlaceButton,
  changeAvatarButton,
} from './utils/constants.js';

const cardSelector = '#card';

let cardList;

const config = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn-inactive',
  inputErrorClass: 'form__error',
  errorClass: '.form__input-error',
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '6577e49f-15b9-4798-93b6-109a6b031458',
  },
  timeout: 20000,
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  hobbySelector: '.profile__hobby',
  avatarSelector: '.profile__picture',
});

const popupWithImage = new PopupWithImage('#show-photo');



const popupEditProfile = new PopupWithForm((inputs) => {
   return api.updateUserInfo({
    name: inputs[0],
    about: inputs[1],
  }).then((user) => {
     userInfo.setUser(user);
  });
}, '#edit-profile');

const popupAddPlace= new PopupWithForm((inputs) => {
  return api.postCard({
    name: inputs[0],
    link: inputs[1],
  }).then((card) => {
    cardList.addItem(card);
  });
}, '#add-place');

const popupChangeAvatar = new PopupWithForm((inputs) => {
  return api.updateUserAvatar(inputs[0])
  .then((user) => {
    userInfo.setUser(user);
  });
},'#edit-avatar');

const popupConfirmDelete = new PopupWithSubmit((card) => {
  return api.deleteCard(card.getId())
  .then(() => {
    card.deleteCard();
  })
}, '#confirm-delete');

const editProfileFormValidator = new FormValidator(config, '#edit-profile'); 
const addPlaceFormValidator = new FormValidator(config, '#add-place');
const editAvatarFormValidator = new FormValidator(config, '#edit-avatar');

profileEditButton.addEventListener('click' , () => {
  popupEditProfile.open(Object.values(userInfo.getUserInfo()));
  editProfileFormValidator.resetValidation();
});

addPlaceButton.addEventListener('click' , () => {
  popupAddPlace.open();
  addPlaceFormValidator.resetValidation();
});

changeAvatarButton.addEventListener('click', () => {
  popupChangeAvatar.open();
  editAvatarFormValidator.resetValidation();
})

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupChangeAvatar.setEventListeners();
popupConfirmDelete.setEventListeners();

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

Promise.all([
  api.getUser(),
  api.getInitialCards(),
]).then(([user, cards]) => {
  userInfo.setUser(user);
  cardList = new Section({
    data: cards, 
    renderer: (card) => (
      new Card(card ,{
        previewFunc: popupWithImage.open,
        likeFunc: api.likeCard,
        unlikeFunc: api.unlikeCard,
        deleteFunc: popupConfirmDelete.open,
      }, cardSelector).generateCard(user._id)
    )
  }, '.photos__list');
  cardList.renderItems();
}).catch((err) => {
  console.log(err);
});
