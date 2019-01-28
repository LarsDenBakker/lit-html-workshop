# lit-html workshop
In this workshop you will work on assigments. The lit-html assignments are done with the whole group, the lit-element assignments are done individually.

You can work on the assignment through the http://plnkr.co/ link in the top of each assignment, or by cloning this repository and running it locally (npm start).

## Assignments
1. [Hello world](./2-lit-element/assignments/1-hello-world.html)
2. [Fetch first article](./2-lit-element/assignments/2-fetch-first-article.html)
3. [Render articles](./2-lit-element/assignments/3-render-articles.html)
4. [Child component](./2-lit-element/assignments/4-child-component.html)
5. [Upwards data flow](./2-lit-element/assignments/5-upwards-data.html)
6. [Filter articles](./2-lit-element/assignments/6-filter-articles.html)

## Solutions
1. [Hello world](./2-lit-element/solutions/1-hello-world.html)
2. [Fetch first article](./2-lit-element/solutions/2-fetch-first-article.html)
3. [Render articles](./2-lit-element/solutions/3-render-articles.html)
4. [Child component](./2-lit-element/solutions/4-child-component.html)
5. [Upwards data flow](./2-lit-element/solutions/5-upwards-data.html)
6. [Filter articles](./2-lit-element/solutions/6-filter-articles.html)

## Cheatsheet
Below are some code samples for quick reference, and some comparisons to how things are in in Polymer.
Checkout the links below for more in-depth explanations.

**Good reference material:**
- lit-html examples: https://open-wc.org/developing/#examples
- official lit-html docs: https://lit-html.polymer-project.org/
- official lit-element docs: https://lit-element.polymer-project.org/

**Other useful links:**
- awesome lit-html, a collection of resources: https://github.com/web-padawan/awesome-lit-html
- open-wc, docs and guides: https://open-wc.org
- lit-html github: https://github.com/Polymer/lit-html
- lit-element github: https://github.com/Polymer/lit-element


## Define a template
```javascript
const template = html`
  <p>Hello world</p>
`;
```

## Set variables inside a template
```javascript
const template = html`
  <p>hello ${message}</p>
`;
```

## Property binding
MyElement has two properties: `users` and `menuItems`
- Polymer sets a property by default, and you need to kebab-case the name
- in lit-html you add a . in front of the property name, but keep the camelCased
name
```javascript
html`
  <!-- polymer -->
  <my-element
    user="[[user]]"
    menu-items="[[menuItems]]">
  </my-element>

  <!-- lit-html -->
  <my-element
    .user=${this.user}
    .menuItems=${this.menuItems}>
  </my-element>
`;
```

## Attribute binding
Attributes are set on the HTML element. in general you should set properties and only set attributes
when you really need to for example to use it in CSS or for some native HTML elements

- lit-html sets an attribute by default,
- in polymer you need to add a $ behind it
- for boolean attributes (attributes that should be removed/added based on boolean value) Polymer did
some hidden magic for you. in lit-html you need to add a ? in front to set this behavior
```javascript
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
```

## Event listeners
- in polymer you pass a string, which polymer will try to map to a function which exists on your class
- in lit-html you pass an actual function which is executed. This function can come from anywhere.
```javascript
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
```

## LitElement class basics
```javascript
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
```

## LitElement lifecycle
```javascript
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
    this.shadowRoot.querySelector('...');
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
```