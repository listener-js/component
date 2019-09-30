/** @jsx myComponent.createElement */

import component from "../"
import join from "@listener-js/join"
import { load, reset } from "@listener-js/listener"
import log from "@listener-js/log"
import store from "@listener-js/store"

beforeEach((): void => {
  document.body.innerHTML = ""
  store.state = {}
  reset(["beforeEach"])
  load(["beforeEach"], { component, join, log, store })
})

test("component", (): void => {
  expect(component).not.toBeUndefined()
})

test("component render", async (): Promise<any> => {
  expect.assertions(5)

  class MyComponent {
    public init(lid: string[]): void {
      expect(1).toBe(1)
    }

    public render(lid: string[]): Element {
      expect(1).toBe(1)
      return <div id={lid} />
    }

    private listenerJoin(): string[][] {
      return [["component"]]
    }
  }

  const myComponent = new MyComponent()

  load([], { myComponent })

  const element = myComponent.render([])

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("myComponent")

  const element2 = myComponent.render([])
  expect(element2).toBe(element)
})

test("component force", (): void => {
  expect.assertions(8)

  class MyComponent {
    public init(lid: string[]): void {
      expect(1).toBe(1)
    }

    public force(lid: string[]): Element {
      expect(0).toBe(1)
      return
    }

    public render(lid: string[]): Element {
      expect(1).toBe(1)
      return <div id={lid} />
    }

    private listenerJoin(): string[][] {
      return [["component"]]
    }
  }

  const myComponent = new MyComponent()
  load([], { myComponent })

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
    public render(lid: string[]): Element {
      // eslint-disable-next-line
      return <div id={lid}>{otherComponent.render(lid)}</div>
    }

    private listenerJoin(lid: string[]): string[][] {
      return [["component"]]
    }
  }

  class OtherComponent {
    public render(lid: string[]): Element {
      return <div id={lid} />
    }

    private listenerJoin(lid: string[]): string[][] {
      return [["component"]]
    }
  }

  const myComponent = new MyComponent()
  const otherComponent = new OtherComponent()

  load([], { myComponent, otherComponent })

  const element = myComponent.render([]).firstElementChild

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("otherComponent-myComponent")
})

test("component ssr render", (): void => {
  expect.assertions(6)

  class MyComponent {
    public init(lid: string[], ssrElement: Element): void {
      // eslint-disable-next-line
      expect(ssrElement).toBe(el)
    }

    public render(lid: string[]): Element {
      expect(1).toBe(1)
      return <div id={lid} />
    }

    private listenerJoin(lid: string[]): string[][] {
      return [["component"]]
    }
  }

  const myComponent = new MyComponent()
  load([], { myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element).not.toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(document.getElementById(element.id)).not.toBe(el)
})

test("component ssr render init return", (): void => {
  expect.assertions(4)

  class MyComponent {
    public init(
      lid: string[],
      ssrElement: Element
    ): Element {
      // eslint-disable-next-line
      expect(ssrElement).toBe(el)
      return ssrElement
    }

    public render(lid: string[]): Element {
      expect(0).toBe(1) // fail
      return <div id={lid} />
    }

    private listenerJoin(lid: string[]): string[][] {
      return [["component"]]
    }
  }

  const myComponent = new MyComponent()
  load([], { myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(document.getElementById(element.id)).toBe(element2)
})
