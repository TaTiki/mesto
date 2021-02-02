export default class FormValidator {
  constructor(config, id) {
    this._formSelector = config.formSelector;
    this._fieldsetSelector = config.fieldsetSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config. inputErrorClass;
    this._errorClass = config.errorClass;
    this._id = id;
    this._form = document.querySelector(this._id).querySelector(this._formSelector);
    this._errorElements = Array.from(this._form.querySelectorAll( this._errorClass));
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }
  
  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState = () => {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }else{
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _clearErrors = () => {
    this._errorElements.forEach((errorElement)=> {
      errorElement.textContent = '';
    });
    this._inputList.forEach((input)=> {
      input.classList.remove(this._inputErrorClass);
    });
  }
  resetValidation = () => {
    this._clearErrors();
    this._toggleButtonState();
  }
}
