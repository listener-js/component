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

Defined in component.ts:24

Synthetic event flag.

___

### `Private` get

• **get**: *`get`*

Defined in component.ts:16

___

### `Private` instances

• **instances**: *`Record<string, any>`*

Defined in component.ts:19

___

###  listeners

• **listeners**: *string[]* = 
    [ "forceRender", "render", "store.get", "store.set" ]

Defined in component.ts:13

___

### `Private` set

• **set**: *`set`*

Defined in component.ts:17

## Methods

###  createElement

▸ **createElement**(`tagName`: any): *`Element`*

Defined in component.ts:42

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *`Element`*

___

###  forceRender

▸ **forceRender**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:122

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

###  join

▸ **join**(`instanceId`: string, `instance`: any): *void*

Defined in component.ts:117

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

###  render

▸ **render**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:142

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:184

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:29

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:30

###  id

• **id**: *boolean* = true

Defined in component.ts:31

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:32

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:33

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:34

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:35

###  value

• **value**: *boolean* = true

Defined in component.ts:36