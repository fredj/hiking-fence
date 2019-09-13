import {LitElement, html, css} from 'lit-element';

class AppAvatar extends LitElement {

  static get properties() {
    return {
      user: Object
    };
  }

  constructor() {
    super();
    this.user = {};
  }

  static get styles() {
    return css`
    .photo {
      width: 60px;
      border-radius: 50%;
    }
  `;
  }

  render() {
    return html`
    <img class="photo" src="${this.user.photoURL}">
    <div class="name">${this.user.displayName}</div>
    <div class="email">${this.user.email}</div>
    `;
  }

}

customElements.define('app-avatar', AppAvatar);
