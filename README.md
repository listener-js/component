# component

![component](media/component.gif)

## Install

```bash
npm install @listener-js/listener @listener-js/component
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
import { myComponent } from "./myComponent"

listener({ myComponent })

myComponent.render([]) // Element
```
