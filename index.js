const cards = [
  {
    title: 'Карачаевск', 
    photo: 'images/karachaevsk.jpg',
  }, {
    title: 'Гора Эльбрус',
    photo: 'images/elbrus.jpg',
  }, {
    title: 'Домбай',
    photo: 'images/dombai.jpg',
  }
]

const containerPhotos = document.querySelector('.photos__list');

function renderCards() {
  cards.forEach(card => {
    console.log(card);
    containerPhotos.innerHTML += '<li class="photos__card">\
    <figure class="photos__figure">\
      <img class="photos__image" src="'+card['photo']+'" alt="картинка">\
      <figcaption class="photos__figcaption">'+card['title']+'</figcaption> \
    </figure>\
    <div class="photos__like">\
      <button class="photos__like-button" aria-label="лайк" value=""></button>\
    </div>\
  </li>'
  });
}

let openForm = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');

function showForm (evt, visible) {
  evt.preventDefault();
  if (visible) { 
    document.querySelector('#name').value = document.querySelector('.profile__name').innerHTML;
    document.querySelector('#caption').value = document.querySelector('.profile__hobby').innerHTML;
    popupElement.style.visibility='visible';
    popupElement.style.opacity=1; 
  }else {
    popupElement.style.visibility='hidden';
  }
}

openForm.addEventListener('click', (evt)=> {showForm(evt, true)});

let formElement = document.querySelector('.form');

function formSubmitHandler(evt) {
    evt.preventDefault();
   
    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#caption');
    console.log(nameInput.value);
    
    document.querySelector('.profile__name').innerHTML = nameInput.value;
    document.querySelector('.profile__hobby').innerHTML = jobInput.value;
    showForm (evt, false);
}


formElement.addEventListener('submit', formSubmitHandler); 

document.querySelector('.popup__close-btn').addEventListener('click',  (evt)=> {showForm(evt, false)});

function like(evt) {
  evt.preventDefault();
  let icon = evt.target;
  let state = icon.value;
  if (state === '') {
    icon.value = 'like';
    icon.style.backgroundImage="url('images/likeactive.svg')";
  }else {
    icon.value = '';
    icon.style.backgroundImage="url('images/like.svg')";
  }
}


renderCards();
const card = cards.shift();
cards.push(card);
renderCards(); 

document.querySelectorAll('.photos__like-button').forEach(button => {
  button.addEventListener('click', like);
});
