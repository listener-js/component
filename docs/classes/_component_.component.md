[@listener-js/component](../README.md) › [Globals](../globals.md) › ["component"](../modules/_component_.md) › [Component](_component_.component.md)

# Class: Component

## Hierarchy

* **Component**

## Index

### Properties

* [components](_component_.component.md#private-components)
* [events](_component_.component.md#private-events)
* [id](_component_.component.md#private-id)
* [store](_component_.component.md#private-store)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [applyCallbacksBindings](_component_.component.md#private-applycallbacksbindings)
* [beforeRender](_component_.component.md#beforerender)
* [componentJoins](_component_.component.md#private-componentjoins)
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

Defined in component.ts:25

___

### `Private` events

• **events**: *Record‹string, boolean›*

Defined in component.ts:31

Synthetic event flag.

___

### `Private` id

• **id**: *string*

Defined in component.ts:24

___

### `Private` store

• **store**: *Store*

Defined in component.ts:26

## Methods

###  afterRender

▸ **afterRender**(`lid`: string[], `element`: Element): *Element*

Defined in component.ts:46

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`element` | Element |

**Returns:** *Element*

___

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in component.ts:206

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  beforeRender

▸ **beforeRender**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:69

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

### `Private` componentJoins

▸ **componentJoins**(`lid`: string[]): *ListenerJoins*

Defined in component.ts:238

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *ListenerJoins*

___

###  createElement

▸ **createElement**(`tagName`: any): *Element*

Defined in component.ts:115

Substitute function for `React.createElement` in JSX.

**Parameters:**

Name | Type |
------ | ------ |
`tagName` | any |

**Returns:** *Element*

___

###  force

▸ **force**(`lid`: string[], ...`args`: any[]): *Element*

Defined in component.ts:191

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`...args` | any[] |

**Returns:** *Element*

___

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `__namedParameters`: object): *ListenerBindings*

Defined in component.ts:242

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |

**Returns:** *ListenerBindings*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `__namedParameters`: object): *void*

Defined in component.ts:259

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`joinInstance` | any |
`listener` | Listener |

**Returns:** *void*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[]): *ListenerJoins*

Defined in component.ts:255

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *ListenerJoins*

___

### `Private` listenerReset

▸ **listenerReset**(): *void*

Defined in component.ts:291

**Returns:** *void*

___

### `Private` simpleId

▸ **simpleId**(`id`: string[]): *string[]*

Defined in component.ts:296

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *string[]*

## Object literals

### `Private` htmlProps

### ▪ **htmlProps**: *object*

Defined in component.ts:36

Dom element props.

###  className

• **className**: *boolean* = true

Defined in component.ts:37

###  id

• **id**: *boolean* = true

Defined in component.ts:38

###  innerHTML

• **innerHTML**: *boolean* = true

Defined in component.ts:39

###  nodeValue

• **nodeValue**: *boolean* = true

Defined in component.ts:40

###  tabIndex

• **tabIndex**: *boolean* = true

Defined in component.ts:41

###  textContent

• **textContent**: *boolean* = true

Defined in component.ts:42

###  value

• **value**: *boolean* = true

Defined in component.ts:43
