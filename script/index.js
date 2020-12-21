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

//эта функция берет форму и добавляет этот элемент в тело HTML
const showForm = (form) => {
  form.classList.add('popup_opened');
}

const hideForm = (form) => {
  form.classList.remove('popup_opened');
}

const initForm = (inputList) =>{
  inputList.forEach((input)=>{
    input.classList.remove('form__error');
    input.nextElementSibling.textContent='';
  })
}

document.querySelector('.profile__edit-button').addEventListener('click', (evt) => {
  editProfileName.value = profileName.textContent;
  editProfileHobby.value = profileHobby.textContent;
  profileSubButton.classList.remove('form__save-btn-inactive');
  initForm(profileInputs);
  showForm(popupEditProfile);
  popupEditProfile.focus();
});

document.querySelector('.profile__add-button').addEventListener('click', (evt) => {
  addPlaceForm.reset();
  addPlaceSubButton.classList.add('form__save-btn-inactive');
  initForm(addPlaceInputs);
  showForm(popupAddPlace);
  popupAddPlace.focus();
});

document.querySelectorAll('.popup__close-btn').forEach((button) => {
  button.addEventListener('click', (evt) => {
    hideForm(evt.target.parentNode.parentNode);
  })
});

popupEditProfile.querySelector('.form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(profileSubButton.classList.contains('form__save-btn-inactive')) {
    return
  }
  profileName.textContent = editProfileName.value;
  profileHobby.textContent = editProfileHobby.value;
  hideForm(popupEditProfile);
});


addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(addPlaceSubButton.classList.contains('form__save-btn-inactive')) {
    return
  }
  cardList.prepend(renderCard(addPlaceName.value, addPlaceLink.value));
  hideForm(popupAddPlace);
});

//пункт 1,функция берет 2 аргумента с name и link и через template вернет карту
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
  card.querySelector('.photos__image').addEventListener('click', (evt) => {
    //const text = evt.target.parentNode.querySelector('.photos__name').textContent;
    popupImage.src = evt.target.src;
    popupImage.alt = name;
    popupInfo.textContent = name;
    showForm(popupPhoto);
    popupPhoto.focus();
  });
  return card;
} 


Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
  popup.addEventListener('keydown', (evt) => {
    //console.log('babis');
    if(evt.key === 'Escape') {
      hideForm(popup);
    }
  })
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      hideForm(popup);
    }
  })
})

initialCards.forEach((card) => {
  cardList.append(renderCard(card.name, card.link));
})

//editProfileName.value = profileName.textContent;
//editProfileHobby.value = profileHobby.textContent;
