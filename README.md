# component

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

import { component } from "@listener-js/component"

export class MyComponent {
  public listeners = ["build", "component.render", "init"]

  public render: typeof component.render

  public init(id: string[], ssrElement: Element) {
    // return element here to prevent build()
  }

  public build(id: string[]): Element {
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
