export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getInitialCards() {
    console.log(`${this.baseUrl}/cards`)
    console.log(this.headers)
    fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
    }).then((resp) => {
      if(resp.ok) {
        return resp.json();
      }
      return Promise.reject(`Ошибка: ${resp.status}`);
    }).catch((err) => {
      return Promise.reject(err);
    })
  }
}
 