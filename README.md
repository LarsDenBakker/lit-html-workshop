# lit-html workshop
[Slides](https://docs.google.com/presentation/d/1KVYiupSAoFyECDwJwxQlJTk8RvSzhg-UKGpZ8-nFm3I)

In this workshop you will work on assigments. The lit-html assignments are done with the whole group, the lit-element assignments are done individually.

You can work on the assignment by copy pasting them into http://plnkr.co/edit/DI9312Rn54NuIH7FRzzD?p=preview, or by cloning this repository and running it locally (npm start).

The assignments should be executed in order, one step sets the stage for the next step. When in doubt, ask us or check the solution.

When you are done (or bored) there are advanced assignments which are free to pick in any order.

[News app demo](https://larsdenbakker.github.io/lit-html-workshop/)

## Assignments
1. [Hello world](./2-lit-element/assignments/1-hello-world.html)
2. [Fetch first article](./2-lit-element/assignments/2-fetch-first-article.html)
3. [Render articles](./2-lit-element/assignments/3-render-articles.html)
4. [Child component](./2-lit-element/assignments/4-child-component.html)
5. [Read/unread toggle](./2-lit-element/assignments/5-read-toggle.html)
6. [Filter articles](./2-lit-element/assignments/6-filter-articles.html)
7. [Styling](./2-lit-element/assignments/7-styling.html)
8. [Polymer components](./2-lit-element/assignments/8-polymer-components.html)
9. [Read/unread counter](./2-lit-element/assignments/9-read-unread-counter.html)
10. [Template function](./2-lit-element/assignments/10-template-function.html)

## Solutions
1. [Hello world](./2-lit-element/solutions/1-hello-world.html)
2. [Fetch first article](./2-lit-element/solutions/2-fetch-first-article.html)
3. [Render articles](./2-lit-element/solutions/3-render-articles.html)
4. [Child component](./2-lit-element/solutions/4-child-component.html)
5. [Read/unread toggle](./2-lit-element/solutions/5-read-toggle.html)
6. [Filter articles](./2-lit-element/solutions/6-filter-articles.html)
7. [Styling](./2-lit-element/solutions/7-styling.html)
8. [Polymer components](./2-lit-element/solutions/8-polymer-components.html)
9. [Read/unread counter](./2-lit-element/solutions/9-read-unread-counter.html)
10. [Template function](./2-lit-element/solutions/10-template-function.html)

## Advanced assignments
These assignments have no solution. Pick a topic you are interested in.
- [Conditional templates](./2-lit-element/assignments/advanced:conditional-templates.html)
- [Directives](./2-lit-element/assignments/advanced:directives.html)
- [Placeholder content](./2-lit-element/assignments/advanced:placeholder-content.html)
- [Shared styles](./2-lit-element/assignments/advanced:shared-styles.html)

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

## Property binding (Polymer VS lit-html)
MyElement has two properties: `users` and `menuItems`
- Polymer: change name to kebab-case, wrap in `[[]]`
- lit-html: use camelCase name, add a . in front, wrap in `${}`

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

## Attribute binding (Polymer VS lit-html)
Attributes are set on the HTML element. in general you should set properties and only set attributes
when you really need to for example to use it in CSS or for some native HTML elements

- Polymer: like property binding, but add a `$` behind it
- lit-html: like property binding, but without a `.` in front

- for boolean attributes Polymer did some hidden magic for you. in lit-html you need to add a ? in front to set this behavior. This will add/remove the attribute based on a boolean value.
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

## Event listeners (Polymer VS lit-html)
- Polymer: pass a string, polymer will try to find a function by that name your component
- lit-html: pass (a reference to) the actual function which will be executed. This function can come from anywhere.
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
