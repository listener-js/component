[@listener-js/component](../README.md) › [Globals](../globals.md) › ["component"](../modules/_component_.md) › [Component](_component_.component.md)

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [components](_component_.component.md#private-components)
* [events](_component_.component.md#private-events)
* [store](_component_.component.md#private-store)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [beforeRender](_component_.component.md#beforerender)
* [createElement](_component_.component.md#createelement)
* [force](_component_.component.md#force)
* [listenerBindings](_component_.component.md#private-listenerbindings)
* [listenerJoined](_component_.component.md#private-listenerjoined)
* [listenerJoins](_component_.component.md#private-listenerjoins)
* [listenerReset](_component_.component.md#private-listenerreset)
* [simpleId](_component_.component.md#private-simpleid)

### Object literals

* [htmlProps](_component_.component.md#private-htmlprops)

## Properties

### `Private` components

• **components**: *Record‹string, any›*

Defined in component.ts:20

___

### `Private` events

• **events**: *Record‹string, boolean›*

Defined in component.ts:26

Synthetic event flag.

___

### `Private` store

• **store**: *Store*

Defined in component.ts:21

## Methods

###  afterRender

▸ **afterRender**(`lid`: string[], `element`: Element): *Element*

Defined in component.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`element` | Element |

**Returns:** *Element*

___

###  beforeRender

▸ **beforeRender**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
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

▸ **force**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:186

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `instanceId`: string): *ListenerBindings*

Defined in component.ts:201

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |

**Returns:** *ListenerBindings*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `listener`: Listener, `instanceId`: string, `instance`: any, `joinInstanceId`: string, `joinInstance`: any): *void*

Defined in component.ts:222

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instanceId` | string |
`instance` | any |
`joinInstanceId` | string |
`joinInstance` | any |

**Returns:** *void*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[]): *ListenerJoins*

Defined in component.ts:218

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *ListenerJoins*

___

### `Private` listenerReset

▸ **listenerReset**(): *void*

Defined in component.ts:258

**Returns:** *void*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:263

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:31

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:32

###  id

• **id**: *boolean* = true

Defined in component.ts:33

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:34

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:35

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:36

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:37

###  value

• **value**: *boolean* = true

Defined in component.ts:38
