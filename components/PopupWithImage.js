import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popupElement.querySelector('.form-photos__image');
    this._popupInfo = this._popupElement.querySelector('.form-photos__info');
    this.open = this.open.bind(this);
  }

  open({name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupInfo.textContent = name;
    super.open();
  } 
}
