import {
  Listener,
  ListenerBindings,
} from "@listener-js/listener"

import { ListenerJoins } from "@listener-js/join"

import store from "@listener-js/store"

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicElements {
      [prop: string]: any
    }
  }
}

export class Component {
  private components: Record<string, any> = {}
  private store: typeof store

  /**
   * Synthetic event flag.
   */
  private events: Record<string, boolean> = {}

  /**
   * Dom element props.
   */
  private htmlProps = {
    className: true,
    id: true,
    innerHTML: true,
    nodeValue: true,
    tabIndex: true,
    textContent: true,
    value: true,
  }

  public afterRender(
    lid: string[],
    element: Element
  ): Element {
    const simpleId = this.simpleId(lid)

    const ssrElement: Element = this.store.get(lid, [
      ...simpleId,
      "ssrElements",
    ])

    if (element && ssrElement && element !== ssrElement) {
      ssrElement.parentNode.replaceChild(
        element,
        ssrElement
      )
    }

    this.store.set(lid, [...simpleId, "elements"], element)

    return element
  }

  public beforeRender(
    lid: string[],
    ...args: any[]
  ): Element {
    const simpleId = this.simpleId(lid)
    const [instanceId] = lid[1].split(/\./)

    let element: Element = this.store.get(lid, [
      ...simpleId,
      "elements",
    ])

    const ssrElement = document.getElementById(
      simpleId.join("-")
    )

    if (ssrElement) {
      this.store.set(
        lid,
        [...simpleId, "ssrElements"],
        ssrElement
      )
    }

    if (!element && this.components[instanceId].init) {
      element = this.components[instanceId].init(
        lid,
        ssrElement,
        ...args
      )
    }

    if (element) {
      this.store.set(
        lid,
        [...simpleId, "elements"],
        element
      )
    }

    return element
  }

  /**
   * Substitute function for `React.createElement` in JSX.
   */
  public createElement(tagName): Element {
    const node =
      tagName.nodeType === 1
        ? tagName
        : document.createElement(tagName)

    for (let i = 1; i < arguments.length; ++i) {
      // eslint-disable-next-line
      const arg = arguments[i]
      if (!arg) {
        continue
      }
      if (!arg.constructor || arg.constructor === Object) {
        for (
          let j = 0, ks = Object.keys(arg);
          j < ks.length;
          ++j
        ) {
          const key = ks[j],
            val = arg[key]
          if (key === "style") {
            node.style.cssText = val
          } else if (
            typeof val !== "string" ||
            this.htmlProps[key]
          ) {
            node[key] = val
            if (key === "id" && Array.isArray(val)) {
              node[key] = this.simpleId(val).join("-")
            }
            //set synthetic events for onUpperCaseName
            if (
              key[0] === "o" &&
              key[1] === "n" &&
              key.charCodeAt(2) < 91 &&
              key.charCodeAt(2) > 64 &&
              !this.events[key]
            ) {
              document.addEventListener(
                key.slice(2).toLowerCase(),
                function(e): any {
                  let tgt: any = e.target
                  do {
                    if (tgt[key]) {
                      return tgt[key](e)
                    }
                  } while ((tgt = tgt.parentNode))
                }
              )
              this.events[key] = true
            }
          } else {
            node.setAttribute(key, val)
          }
        }
      } else {
        if (Array.isArray(arg)) {
          for (let k = 0; k < arg.length; ++k) {
            node.appendChild(
              arg[k].nodeType
                ? arg[k]
                : document.createTextNode(arg[k])
            )
          }
        } else {
          node.appendChild(
            arg.nodeType
              ? arg
              : document.createTextNode(arg)
          )
        }
      }
    }
    return node
  }

  public force(lid: string[], ...args: any[]): Element {
    const simpleId = this.simpleId(lid)
    const [instanceId] = lid[1].split(/\./)

    this.store.delete(lid, [...simpleId, "elements"])
    this.store.delete(lid, [...simpleId, "ssrElements"])

    const element = this.components[instanceId].render(
      lid.slice(2),
      ...args
    )

    return element
  }

  private listenerBindings(
    lid: string[],
    instanceId: string
  ): ListenerBindings {
    return [
      [
        ["join.instanceJoined", instanceId, "**"],
        `${instanceId}.listenerJoined`,
      ],
      [
        ["listener.reset", "**"],
        `${instanceId}.listenerReset`,
        { prepend: true },
      ],
    ]
  }

  private listenerJoins(lid: string[]): ListenerJoins {
    return [[["store"]]]
  }

  private listenerJoined(
    lid: string[],
    listener: Listener,
    instanceId: string,
    instance: any,
    joinInstanceId: string,
    joinInstance: any
  ): void {
    joinInstance.createElement = this.createElement.bind(
      this
    )

    this.components[joinInstanceId] = joinInstance

    listener.bind(
      lid,
      [`${joinInstanceId}.render`, "**"],
      `${instanceId}.beforeRender`,
      { intercept: true, prepend: true }
    )

    listener.bind(
      lid,
      [`${joinInstanceId}.render`, "**"],
      `${instanceId}.afterRender`,
      { intercept: true }
    )

    listener.bind(
      lid,
      [`${joinInstanceId}.force`, "**"],
      `${instanceId}.force`,
      { intercept: true, prepend: true }
    )
  }

  private listenerReset(): void {
    this.components = {}
    delete this.store
  }

  private simpleId(id: string[]): string[] {
    return id.reduce((memo, v: string): string[] => {
      const a = v.split(/\./)

      if (a[0] !== "component") {
        return memo.concat(a[0])
      }

      return memo
    }, [])
  }
}

export default new Component()
