/** @jsx myComponent.createElement */

import expect from "expect"
import join from "@listener-js/join"
import component from "../src"

import {
  load,
  reset,
  ListenerEvent,
} from "@listener-js/listener"

import log from "@listener-js/log"
import store from "@listener-js/store"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

beforeEach((): void => {
  document.body.innerHTML = ""

  reset(["beforeEach"])
  load(["beforeEach"], { join, log, store })
})

it("component", (): void => {
  expect(component).not.toBeUndefined()
})

it("component render", async (): Promise<any> => {
  expect.assertions(5)

  class MyComponent {
    join: typeof join.join

    public init(lid: string[]): void {
      expect(1).toBe(1)
    }

    public render(lid: string[]): Element {
      expect(1).toBe(1)
      return <div id={lid} />
    }

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): void {
      this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()

  load([], { component, myComponent })

  const element = myComponent.render([])

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("myComponent")

  const element2 = myComponent.render([])
  expect(element2).toBe(element)
})

it("async component render", async (): Promise<any> => {
  expect.assertions(4)

  class MyComponent {
    join: typeof join.join

    public init(lid: string[]): void {
      expect(1).toBe(1)
    }

    public render(lid: string[]): Promise<Element> {
      expect(1).toBe(1)
      return delay(1, <div id={lid} />)
    }

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): void {
      this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()

  load([], { component, myComponent })

  return myComponent.render([]).then(element => {
    expect(element).toEqual(expect.any(HTMLDivElement))
    expect(element.id).toBe("myComponent")
  })
})

it("component force", (): void => {
  expect.assertions(8)

  class MyComponent {
    join: typeof join.join

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

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): void {
      this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()
  load([], { component, myComponent })

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

it("nested component render", async (): Promise<void> => {
  expect.assertions(2)

  class MyComponent {
    private join: typeof join.join
    private otherComponent: OtherComponent

    public render(lid: string[]): Element {
      return (
        <div id={lid}>
          {this.otherComponent.render(lid)}
        </div>
      )
    }

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): Promise<void> | void {
      return this.join(
        lid,
        event,
        "component",
        "otherComponent"
      )
    }
  }

  class OtherComponent {
    private join: typeof join.join

    public render(lid: string[]): Element {
      return <div id={lid} />
    }

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): Promise<void> | void {
      return this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()
  const otherComponent = new OtherComponent()

  const promise = load([], { component, myComponent })
  load([], { otherComponent })

  await promise

  const element = myComponent.render([]).firstElementChild

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element.id).toBe("otherComponent-myComponent")
})

it("component ssr render", (): void => {
  expect.assertions(6)

  class MyComponent {
    join: typeof join.join

    public init(lid: string[], ssrElement: Element): void {
      // eslint-disable-next-line
      expect(ssrElement).toBe(el)
    }

    public render(lid: string[]): Element {
      expect(1).toBe(1)
      return <div id={lid} />
    }

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): void {
      this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()
  load([], { component, myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])

  expect(element).toEqual(expect.any(HTMLDivElement))
  expect(element).not.toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(document.getElementById(element.id)).not.toBe(el)
})

it("component ssr render init return", (): void => {
  expect.assertions(4)

  class MyComponent {
    join: typeof join.join

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

    private listenerLoaded(
      lid: string[],
      event: ListenerEvent
    ): void {
      this.join(lid, event, "component")
    }
  }

  const myComponent = new MyComponent()
  load([], { component, myComponent })

  const el = <div id="myComponent" />
  document.body.appendChild(el)

  const element = myComponent.render([])
  expect(element).toBe(el)

  const element2 = myComponent.render([])
  expect(element2).toBe(element)

  expect(document.getElementById(element.id)).toBe(element2)
})
