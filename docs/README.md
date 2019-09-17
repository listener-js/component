[@listener-js/component](README.md) › [Globals](globals.md)

# @listener-js/component

# @listener-js/component

Listener web component

![component](media/component.gif)

## Install

```bash
npm install @listener-js/listener \
  @listener-js/component \
  @listener-js/store
```

## Example component

```tsx
/** @jsx myComponent.createElement */

export class MyComponent {
  public listeners = ["init", "render"]
  public instances = ["component"]

  public init(id: string[], ssrElement: Element) {
    // return element to prevent render()
  }

  public render(id: string[]): Element {
    return <div id={id} />
  }
}

export const myComponent = new MyComponent()
```

## Usage

```js
import { listener } from "@listener-js/listener"
import { component } from "@listener-js/component"
import { store } from "@listener-js/store"

import { myComponent } from "./myComponent"

listener({ component, myComponent, store })

myComponent.render([]) // Element
```
