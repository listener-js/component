import {
  Listener,
  ListenerBindings,
  ListenerEvent,
} from "@listener-js/listener"

import {
  ListenerJoins,
  ListenerJoinEvent,
} from "@listener-js/join"

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
  private id: string
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

  private applyCallbacksBindings(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (
      options &&
      options.reload === true &&
      Object.values(instances).indexOf(this) < 0
    ) {
      return
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (instance === this) {
        continue
      }

      if (instance.render) {
        listener.bind(
          lid,
          ["join.listenerJoins", instanceId, "**"],
          `${this.id}.componentJoins`,
          { append: true, return: true }
        )
      }
    }
  }

  private componentJoins(lid: string[]): ListenerJoins {
    return [[["component"]]]
  }

  private listenerBindings(
    lid: string[],
    { instance, listener }: ListenerEvent
  ): ListenerBindings {
    return [
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.applyCallbacksBindings`,
        { listener: true, prepend: true },
      ],
    ]
  }

  private listenerJoins(lid: string[]): ListenerJoins {
    return [[["store"]]]
  }

  private listenerJoined(
    lid: string[],
    { listener, instance, joinInstance }: ListenerJoinEvent
  ): void {
    joinInstance.createElement = this.createElement.bind(
      this
    )

    this.components[joinInstance.id] = joinInstance

    listener.bind(
      lid,
      [`${joinInstance.id}.render`, "**"],
      `${instance.id}.beforeRender`,
      { intercept: true, prepend: true }
    )

    listener.bind(
      lid,
      [`${joinInstance.id}.render`, "**"],
      `${instance.id}.afterRender`,
      { intercept: true }
    )

    listener.bind(
      lid,
      [`${joinInstance.id}.force`, "**"],
      `${instance.id}.force`,
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
