

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
 // errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  //errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const setEventListeners = (formElement, inputErrorClass, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement) ;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass) ;
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector))
    //console.log(fieldsetList);
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config.inputErrorClass, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass);
    });
    //setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  const inputArray = Array.from(inputList);
  for (let i=0; i<inputArray.length; i++) {
    if (!inputArray[i].validity.valid) {
      return true;
    }
  }
  return false;
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  }else{
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

/*enableValidation({
  formSelector: '.popup__form',
  fieldsetSelector: '',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); */

enableValidation({
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn-inactive',
  inputErrorClass: 'form__input-error'
})
