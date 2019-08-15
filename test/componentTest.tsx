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
  expect.assertions(4)

  class MyComponent {
    public listeners =
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init() {
      expect(1).toBe(1)
    }

    public build(): Element {
      expect(1).toBe(1)
      return <div />
    }
  }

  const myComponent = new MyComponent()

  listener({ myComponent })

  const element = myComponent.render([])
  expect(element).toEqual(expect.any(HTMLDivElement))

  const element2 = myComponent.render([])
  expect(element2).toEqual(element)
})


test("component ssr render", (): void => {
  expect.assertions(4)

  class MyComponent {
    public listeners =
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
    }

    public build(): Element {
      expect(1).toBe(1)
      return <div />
    }
  }

  const myComponent = new MyComponent()
  listener({ myComponent })

  const el = <div id="myComponent.render" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toEqual(expect.any(HTMLDivElement))

  const element2 = myComponent.render([])
  expect(element2).toEqual(element)
})

test("component ssr render init return", (): void => {
  expect.assertions(3)

  class MyComponent {
    public listeners =
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
      return ssrElement
    }

    public build(): Element {
      expect(0).toBe(1) // fail
      return <div />
    }
  }

  const myComponent = new MyComponent()
  listener({ myComponent })

  const el = <div id="myComponent.render" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toEqual(expect.any(HTMLDivElement))

  const element2 = myComponent.render([])
  expect(element2).toEqual(element)
})
