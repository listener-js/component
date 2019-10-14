[@listener-js/component](../README.md) › [Globals](../globals.md) › ["component"](../modules/_component_.md) › [Component](_component_.component.md)

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [components](_component_.component.md#private-components)
* [events](_component_.component.md#private-events)
* [id](_component_.component.md#private-id)
* [join](_component_.component.md#private-join)
* [store](_component_.component.md#private-store)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [beforeRender](_component_.component.md#beforerender)
* [createElement](_component_.component.md#createelement)
* [force](_component_.component.md#force)
* [listenerJoined](_component_.component.md#private-listenerjoined)
* [listenerLoaded](_component_.component.md#private-listenerloaded)
* [listenerLoadedAny](_component_.component.md#private-listenerloadedany)
* [listenerReset](_component_.component.md#private-listenerreset)
* [simpleId](_component_.component.md#private-simpleid)

### Object literals

* [htmlProps](_component_.component.md#private-htmlprops)

## Properties

### `Private` components

• **components**: *Record‹string, any›*

Defined in component.ts:21

___

### `Private` events

• **events**: *Record‹string, boolean›*

Defined in component.ts:28

Synthetic event flag.

___

### `Private` id

• **id**: *string*

Defined in component.ts:20

___

### `Private` join

• **join**: *ListenerJoin*

Defined in component.ts:22

___

### `Private` store

• **store**: *Store*

Defined in component.ts:23

## Methods

###  afterRender

▸ **afterRender**(`lid`: string[], `element`: Element): *Element*

Defined in component.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`element` | Element |

**Returns:** *Element*

___

###  beforeRender

▸ **beforeRender**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

###  createElement

▸ **createElement**(`tagName`: any): *Element*

Defined in component.ts:112

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *Element*

___

###  force

▸ **force**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `event`: ListenerJoinEvent): *void*

Defined in component.ts:223

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerJoinEvent |

**Returns:** *void*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `__namedParameters`: object): *void*

Defined in component.ts:203

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void*

___

### `Private` listenerLoadedAny

▸ **listenerLoadedAny**(`lid`: string[], `__namedParameters`: object): *void*

Defined in component.ts:210

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void*

___

### `Private` listenerReset

▸ **listenerReset**(): *void*

Defined in component.ts:260

**Returns:** *void*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:266

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:33

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:34

###  id

• **id**: *boolean* = true

Defined in component.ts:35

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:36

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:37

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:38

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:39

###  value

• **value**: *boolean* = true

Defined in component.ts:40
