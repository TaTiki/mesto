let openForm = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let formName = document.querySelector('#name');
let formHobby = document.querySelector('#caption');
let profileName = document.querySelector('.profile__name');
let profileHobby = document.querySelector('.profile__hobby');
let closeFormBtn = document.querySelector('.form__close-btn');
let photoLikeBtn = document.querySelectorAll('.photos__like-button');

function showForm (evt){
  evt.preventDefault();
  if (popupElement.className === 'popup'){ 
    formName.value = profileName.textContent;
    formHobby.value = profileHobby.textContent;
    popupElement.classList.add('popup_opened')
  }else{
    popupElement.classList.remove('popup_opened')
  }
}

function formSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileHobby.textContent = formHobby.value;
  showForm(evt);
}

function like(evt){
  evt.preventDefault();
  let icon = evt.target;
  let state = icon.value;
  if (state === ''){
    icon.value = 'like';
    icon.style.backgroundImage="url('images/likeactive.svg')";
  }else{
    icon.value = '';
    icon.style.backgroundImage="url('images/like.svg')";
  }
}

photoLikeBtn.forEach(button => {
  button.addEventListener('click', like);
});

openForm.addEventListener('click', showForm);
closeFormBtn.addEventListener('click', showForm);
formElement.addEventListener('submit', formSubmitHandler); 
