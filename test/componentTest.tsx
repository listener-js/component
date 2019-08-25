/** @jsx myComponent.createElement */

import { component } from "../"
import { listener, reset } from "@listener-js/listener"
import { log } from "@listener-js/log"
import { store } from "@listener-js/store"

beforeEach(() => {
  document.body.innerHTML = ""
  store.state = {}
  reset()
  listener({ component, log, store })
})

test("component", (): void => {
  expect(component).not.toBeUndefined()
})

test("component render", (): void => {
  expect.assertions(5)

  class MyComponent {
    public listeners = ["init", "render"]
    public instances = ["component"]

    public init() {
      expect(1).toBe(1)
    }

    public render(id: string[]): Element {
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

test("component force", (): void => {
  expect.assertions(8)

  class MyComponent {
    public listeners = ["force", "init", "render"]
    public instances = ["component"]

    public init() {
      expect(1).toBe(1)
    }

    public force(id: string[]): Element {
      expect(0).toBe(1)
      return
    }

    public render(id: string[]): Element {
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

  const element2 = myComponent.force([])
  const element3 = document.getElementById(element.id)

  expect(element2).toBe(element3)
  expect(element3).not.toBe(el)
  expect(element3).not.toBe(element)
})

test("nested component render", (): void => {
  expect.assertions(2)

  class MyComponent {
    public listeners = ["render"]
    public instances = ["component"]

    public render(id: string[]): Element {
      return <div id={id}>
        {otherComponent.render(id)}
      </div>
    }
  }

  class OtherComponent {
    public listeners = ["build", "render"]
    public instances = ["component"]

    public render(id: string[]): Element {
      return <div id={id} />
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
    public listeners = ["init", "render"]
    public instances = ["component"]
    public component: typeof component

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
    }

    public render(id: string[]): Element {
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
    public listeners = ["init", "render"]
    public instances = ["component"]

    public init(id: string[], ssrElement: Element) {
      expect(ssrElement).toBe(el)
      return ssrElement
    }

    public render(id: string[]): Element {
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
