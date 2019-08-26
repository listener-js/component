> **[@listener-js/component](../README.md)**

[Globals](../globals.md) / ["component"](../modules/_component_.md) / [Component](_component_.component.md) /

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [components](_component_.component.md#private-components)
* [events](_component_.component.md#private-events)
* [instanceId](_component_.component.md#private-instanceid)
* [instances](_component_.component.md#instances)
* [listener](_component_.component.md#private-listener)
* [listeners](_component_.component.md#listeners)
* [store](_component_.component.md#private-store)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [beforeRender](_component_.component.md#beforerender)
* [createElement](_component_.component.md#createelement)
* [force](_component_.component.md#force)
* [join](_component_.component.md#join)
* [simpleId](_component_.component.md#private-simpleid)

### Object literals

* [htmlProps](_component_.component.md#private-htmlprops)

## Properties

### `Private` components

• **components**: *`Record<string, any>`*

Defined in component.ts:17

___

### `Private` events

• **events**: *`Record<string, boolean>`*

Defined in component.ts:25

Synthetic event flag.

___

### `Private` instanceId

• **instanceId**: *string*

Defined in component.ts:18

___

###  instances

• **instances**: *string[]* =  ["store"]

Defined in component.ts:15

___

### `Private` listener

• **listener**: *`Listener`*

Defined in component.ts:19

___

###  listeners

• **listeners**: *string[]* =  ["afterRender", "beforeRender", "force"]

Defined in component.ts:14

___

### `Private` store

• **store**: *`Store`*

Defined in component.ts:20

## Methods

###  afterRender

▸ **afterRender**(`id`: string[], `element`: `Element`, ...`args`: any[]): *`Element`*

Defined in component.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`element` | `Element` |
`...args` | any[] |

**Returns:** *`Element`*

___

###  beforeRender

▸ **beforeRender**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:59

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

###  createElement

▸ **createElement**(`tagName`: any): *`Element`*

Defined in component.ts:92

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *`Element`*

___

###  force

▸ **force**(`id`: string[], ...`args`: any[]): *`Element`*

Defined in component.ts:167

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *`Element`*

___

###  join

▸ **join**(`instanceId`: string, `instance`: any): *void*

Defined in component.ts:183

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:207

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