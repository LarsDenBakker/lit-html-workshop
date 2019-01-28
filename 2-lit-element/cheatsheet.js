/** define a template */
const template = html`
  <p>Hello world</p>
`;

/** set variables inside a template */
const template = html`
  <p>hello ${message}</p>
`;

/**
 * Property binding
 * MyElement has two properties: 'users' and 'menuItems'
 *
 * polymer sets a property by default, and you need to kebab-case the name
 * in lit-html you add a . in front of the property name, but keep the camelCased
 * name
 */
html`
  <!-- polymer -->
  <my-element user="[[user]]" menu-items="[[menuItems]]">
  </my-element>

  <!-- lit-html -->
  <my-element .user=${this.user} .menuItems=${this.menuItems}>
  </my-element>
`;

/**
 * Attribute binding
 *
 * attributes are set on the HTML element. in general you should set properties and only set attributes
 * when you really need to for example to use it in CSS or for some native HTML elements
 *
 * lit-html sets an attribute by default,
 * in polymer you need to add a $ behind it
 *
 * for boolean attributes (attributes that should be removed/added based on boolean value) Polymer did
 * some hidden magic for you. in lit-html you need to add a ? in front to set this behavior
 */
html`
  <!-- polymer -->
  <img src$="[[imgSrc]]">
  <select>
    <option selected$="[[selected]]"></option>
  </select>

  <!-- lit-html -->
  <img src=${imgSrc}>
  <select>
    <option ?selected=${this.selected}></option>
  </select>
`;

/** Event listeners */
// in polymer you pass a string, which polymer will try to map to a function which exists on your class
// in lit-html you pass an actual function which is executed. This function can come from anywhere.
html`
  <!-- polymer -->
  <button on-click="_onButtonClicked">
    Click me
  </button>

  <!-- lit-html -->
  <!-- a function on your class instance -->
  <button @click=${this._onButtonClicked}>
    Click me
  </button>

  <!-- a function outside your class, for example a utility function -->
  <button @click=${onButtonClicked}>
    Click me
  </button>

  <!-- an inline function, useful for small changes -->
  <button @click=${()=> this.expanded = !this.expanded}>
    Click me
  </button>
`;

/** LitElement class basics */
import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.0-rc.5?module';

class MyElement extends LitElement {
  // your styles are defined in a static styles property
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      message: { type: String }
    };
  }

  constructor() {
    super();

    // default value is no longer set in the static properties definition, but in the constructor
    this.message = 'World';
  }

  render() {
    return html`
      <p>Hello ${this.message}</p>

      <button @click=${this._onButtonClicked}>
        Click me!
      </button>
    `;
  }

  _onButtonClicked() {
    console.log('button clicked!');
  }
}

customElements.define('my-element', MyElement);


/** LitElement lifecycle */
import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.0-rc.5?module';

class MyElement extends LitElement {
  // styles: called once on element defintion, styles are the same for all instances
  static get styles() {
    return css``;
  }

  // properties: called once on element definition
  static get properties() {
    return {};
  }

  // called once for each instance of your component
  constructor() {
    super();
  }

  // called each time LitElement wants to render because a property changed
  // you can return a boolean to control whether or not the render should occur
  // changedProperties is a Map
  shouldUpdate(changedProperties) {
    if (changedProperties.has('somePropertyThatShouldNotCauseAnUpdate')) {
      return false;
    }
    return true;
  }

  // called each time LitElement wants to re-render your changes, if you did not
  // implement a custom shouldUpdate this will trigger each property c hange
  render() {
    return html``;
  }

  // called the first time your element has been rendered, can be useful when you need
  // to access your DOM elements
  // changedProperties is a Map
  firstUpdated(changedProperties) {
    this.shadowRoot.querySelector('');
  }

  // called each time a render has occurred, this is useful to set up observers
  // changedProperties is a Map
  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      this._onOpenedChanged();
    }

    if (changedProperties.has('message')) {
      this._doSomethingWithMessage(this.message);
    }
  }

}

customElements.define('my-element', MyElement);