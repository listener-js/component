import { store } from "@listener-js/store"

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicElements {
      [prop: string]: any
    }
  }
}

export class Component {
  public instances = ["store.get", "store.set"]
  public listeners = ["forceRender", "render"]
  
  private get: typeof store.get
  private set: typeof store.set

  private components: Record<string, any> = {}

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

  /**
   * Substitute function for `React.createElement` in JSX.
   */
  public createElement(tagName): Element {
    const node =
      tagName.nodeType === 1
        ? tagName
        : document.createElement(tagName)

    for (let i = 1; i < arguments.length; ++i) {
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
                function (e): any {
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

  public join(instanceId: string, instance: any): void {
    instance.createElement = this.createElement.bind(this)
    this.components[instanceId] = instance
  }

  public forceRender(
    id: string[], ...args: any[]
  ): Element {
    const simpleId = this.simpleId(id)
    const [instanceId] = id[1].split(/\./)

    const existingElement: Element =
      this.get(id, [...simpleId, "elements"])
    
    const element = this.components[instanceId].build(
      id, ...args
    )

    existingElement.parentNode.replaceChild(
      element, existingElement
    )

    return element
  }

  public render(id: string[], ...args: any[]): Element {
    const simpleId = this.simpleId(id)
    const [instanceId] = id[1].split(/\./)
    
    let element: Element =
      this.get(id, [...simpleId, "elements"])

    if (element !== undefined) {
      return element
    }

    const ssrElement = document.getElementById(
      simpleId.join("-")
    )

    if (ssrElement) {
      this.set(id, [...simpleId, "ssrElements"], ssrElement)
    }

    if (this.components[instanceId].init) {
      element = this.components[instanceId].init(
        id, ssrElement, ...args
      )
    }

    if (!element) {
      element = this.components[instanceId].build(
        id, ...args
      )
    }

    if (element && ssrElement && element !== ssrElement) {
      ssrElement.parentNode.replaceChild(
        element, ssrElement
      )
    }

    this.set(id, [...simpleId, "elements"], element)

    return element
  }

  private simpleId(id: string[]): string[] {
    return id
      .reduce((memo, v: string): string[] => {
        const a = v.split(/\./)
        
        if (
          a[0] !== "component" &&
          (!a[1] || a[1] !== "build")
        ) {
          return memo.concat(a[0])
        }
        
        return memo
      }, [])
  }
}

export const component = new Component()
