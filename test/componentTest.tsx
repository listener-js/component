/** @jsx myComponent.createElement */

import { component } from "../"
import { listener } from "@listener-js/listener"
import { log } from "@listener-js/log"
import { store } from "@listener-js/store"

listener({ component, log, store })

beforeEach(() => {
  document.body.innerHTML = ""
  store.state = {}
})

test("component", (): void => {
  expect(component).not.toBeUndefined()
})

test("component render", (): void => {
  expect.assertions(5)

  class MyComponent {
    public listeners =
      ["build", "component", "init", "render"]

    public component: typeof component

    public init() {
      expect(1).toBe(1)
    }

    public build(id: string[]): Element {
      expect(1).toBe(1)
      return <div id={id} />
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  const myComponent = new MyComponent()

  listener({ myComponent })

  const element = myComponent.render([])

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("myComponent")

  const element2 = myComponent.render([])
  expect(element2).toBe(element)
})

test("component forceRender", (): void => {
  expect.assertions(7)

  class MyComponent {
    public listeners = [
      "build", "component", "forceRender", "init", "render"
    ]

    public component: typeof component

    public init() {
      expect(1).toBe(1)
    }

    public build(id: string[]): Element {
      expect(1).toBe(1)
      return <div id={id} />
    }

    public forceRender(id: string[]) {
      return this.component.forceRender(id)
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  const myComponent = new MyComponent()
  listener({ myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toEqual(expect.any(HTMLDivElement))

  const element2 = myComponent.forceRender([])
  const element3 = document.getElementById(element.id)

  expect(element2).toBe(element3)
  expect(element3).not.toBe(el)
  expect(element3).not.toBe(element)
})

test("nested component render", (): void => {
  expect.assertions(2)

  class MyComponent {
    public listeners =
      ["build", "component", "render"]

    public component: typeof component

    public build(id: string[]): Element {
      return <div id={id}>
        {otherComponent.render(id)}
      </div>
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  class OtherComponent {
    public listeners =
      ["build", "component", "render"]

    public component: typeof component

    public build(id: string[]): Element {
      return <div id={id} />
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  const myComponent = new MyComponent()
  const otherComponent = new OtherComponent()

  listener({ myComponent, otherComponent })

  const element = myComponent.render([]).firstElementChild

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("otherComponent-myComponent")
})


test("component ssr render", (): void => {
  expect.assertions(6)

  class MyComponent {
    public listeners =
      ["build", "component", "init", "render"]

    public component: typeof component

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
    }

    public build(id: string[]): Element {
      expect(1).toBe(1)
      return <div id={id} />
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  const myComponent = new MyComponent()
  listener({ myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  
  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element).not.toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(
    document.getElementById(element.id)
  ).not.toBe(el)
})

test("component ssr render init return", (): void => {
  expect.assertions(4)

  class MyComponent {
    public listeners =
      ["build", "component", "init", "render"]

    public component: typeof component

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
      return ssrElement
    }

    public build(id: string[]): Element {
      expect(0).toBe(1) // fail
      return <div id={id} />
    }

    public render(id: string[]) {
      return this.component.render(id)
    }
  }

  const myComponent = new MyComponent()
  listener({ myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(document.getElementById(element.id)).toBe(element2)
})
