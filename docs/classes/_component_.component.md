> **[component](../README.md)**

[Globals](../globals.md) / ["component"](../modules/_component_.md) / [Component](_component_.component.md) /

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [events](_component_.component.md#private-events)
* [get](_component_.component.md#private-get)
* [instances](_component_.component.md#private-instances)
* [listenerInstances](_component_.component.md#listenerinstances)
* [listeners](_component_.component.md#listeners)
* [set](_component_.component.md#private-set)

### Methods

* [createElement](_component_.component.md#createelement)
* [forceRender](_component_.component.md#forcerender)
* [join](_component_.component.md#join)
* [render](_component_.component.md#render)
* [simpleId](_component_.component.md#private-simpleid)

### Object literals

* [htmlProps](_component_.component.md#private-htmlprops)

## Properties

### `Private` events

• **events**: *`Record<string, boolean>`*

Defined in component.ts:25

Synthetic event flag.

___

### `Private` get

• **get**: *`get`*

Defined in component.ts:17

___

### `Private` instances

• **instances**: *`Record<string, any>`*

Defined in component.ts:20

___

###  listenerInstances

• **listenerInstances**: *string[]* =  ["store.get", "store.set"]

Defined in component.ts:15

___

###  listeners

• **listeners**: *string[]* =  ["forceRender", "render"]

Defined in component.ts:13

___

### `Private` set

• **set**: *`set`*

Defined in component.ts:18

## Methods

###  createElement

▸ **createElement**(`tagName`: any): *`Element`*

Defined in component.ts:43

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *`Element`*

___

###  forceRender

▸ **forceRender**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:123

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

###  join

▸ **join**(`instanceId`: string, `instance`: any): *void*

Defined in component.ts:118

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

###  render

▸ **render**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:143

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:185

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:30

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:31

###  id

• **id**: *boolean* = true

Defined in component.ts:32

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:33

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:34

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:35

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:36

###  value

• **value**: *boolean* = true

Defined in component.ts:37