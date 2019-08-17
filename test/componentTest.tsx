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
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init() {
      expect(1).toBe(1)
    }

    public build(id: string[]): Element {
      expect(1).toBe(1)
      return <div id={id} />
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


test("component ssr render", (): void => {
  expect.assertions(6)

  class MyComponent {
    public listeners =
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
    }

    public build(id: string[]): Element {
      expect(1).toBe(1)
      return <div id={id} />
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
      ["build", "component.render", "init"]

    public render: typeof component.render

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
      return ssrElement
    }

    public build(id: string[]): Element {
      expect(0).toBe(1) // fail
      return <div id={id} />
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
