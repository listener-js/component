[@listener-js/component](../README.md) › [Globals](../globals.md) › ["component"](../modules/_component_.md) › [Component](_component_.component.md)

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [components](_component_.component.md#private-components)
* [events](_component_.component.md#private-events)
* [externals](_component_.component.md#externals)
* [instanceId](_component_.component.md#private-instanceid)
* [listener](_component_.component.md#private-listener)
* [listeners](_component_.component.md#listeners)
* [store](_component_.component.md#private-store)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [beforeRender](_component_.component.md#beforerender)
* [createElement](_component_.component.md#createelement)
* [force](_component_.component.md#force)
* [listenerJoin](_component_.component.md#listenerjoin)
* [simpleId](_component_.component.md#private-simpleid)

### Object literals

* [htmlProps](_component_.component.md#private-htmlprops)

## Properties

### `Private` components

• **components**: *Record‹string, any›*

Defined in component.ts:22

___

### `Private` events

• **events**: *Record‹string, boolean›*

Defined in component.ts:30

Synthetic event flag.

___

###  externals

• **externals**: *string[]* =  ["store"]

Defined in component.ts:20

___

### `Private` instanceId

• **instanceId**: *string*

Defined in component.ts:23

___

### `Private` listener

• **listener**: *Listener*

Defined in component.ts:24

___

###  listeners

• **listeners**: *string[]* =  [
    "afterRender",
    "beforeRender",
    "force",
  ]

Defined in component.ts:14

___

### `Private` store

• **store**: *Store*

Defined in component.ts:25

## Methods

###  afterRender

▸ **afterRender**(`id`: string[], `element`: Element): *Element*

Defined in component.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`element` | Element |

**Returns:** *Element*

___

###  beforeRender

▸ **beforeRender**(`id`: string[], ...`args`: any[]): *Element*

Defined in component.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

###  createElement

▸ **createElement**(`tagName`: any): *Element*

Defined in component.ts:110

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *Element*

___

###  force

▸ **force**(`id`: string[], ...`args`: any[]): *Element*

Defined in component.ts:186

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

###  listenerJoin

▸ **listenerJoin**(`id`: string[], `instanceId`: string, `instance`: any): *void*

Defined in component.ts:201

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:232

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:35

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:36

###  id

• **id**: *boolean* = true

Defined in component.ts:37

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:38

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:39

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:40

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:41

###  value

• **value**: *boolean* = true

Defined in component.ts:42
