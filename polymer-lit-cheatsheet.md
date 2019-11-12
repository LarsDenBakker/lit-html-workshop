# Polymer / lit-html comparison

## Define a component:

Polymer requires a static `is` field, `LitElement` doesn't need it.

Polymer:
```javascript
class MyElement extends Polymer.Element {
  static get is() {
    return 'my-element';
  }
}

customElements.define(MyElement.is, MyElement);
```

LitElement:

```javascript
class MyElement extends LitElement {
  
}

customElements.define('my-element', MyElement);
```

## Define a template and styles

Polymer 2:
```html
<dom-module id="my-element">
  <template>
    <style>
      ...
    </style>
    ...
  </template>
  
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return 'my-element';
      }
    }

    customElements.define(MyElement.is, MyElement);
  </script>
</dom-module>
```

Polymer 3:
```js
import { PolymerElement, html } from '@polymer/element';

class MyElement extends PolymerElement {
  static get is() {
    return 'my-element';
  }
  
  static get template() {
    return html`
      <template>
        <style>
          ...
        </style>
        ...
      </template>
    `;
  }
}

customElements.define(MyElement.is, MyElement);
```

LitElement:
```js
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get styles() {
    return css`
      ...
    `;
  }
  render() {
    return html`
      ...
    `;
  }
}

customElements.define('my-element', MyElement);
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
