# vd-multiselect

> React MultiSelect Component

> [Demo](https://liccampanavd.github.io/vd-multiselect/)

[![NPM](https://img.shields.io/npm/v/@liccampanavd/vd-multiselect.svg)](https://www.npmjs.com/package/@liccampanavd/vd-multiselect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @liccampanavd/vd-multiselect
```

## Usage

```jsx
import React, { Component } from 'react'
import MultiSelect from '@liccampanavd/vd-multiselect'

class Example extends Component {
  render() {
    return <MultiSelect />
  }
}
```

## Props

| Name               | Type                    | Default                                                                                                                                                                                                       | Description                                                                    |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `clearEnabled`     | boolean                 | true                                                                                                                                                                                                          | Specifies whether to display the Clear button in the widget                    |
| `disabled`         | boolean                 | false                                                                                                                                                                                                         | Specifies whether the widget responds to user interaction                      |
| `disabledItems`    | array[int]              | []                                                                                                                                                                                                            | Specifies the items whose should not be enabled                                |
| `displayInfo`      | boolean                 | true                                                                                                                                                                                                          | Specifies the selection information text                                       |
| `elementAttr`      | object                  | {}                                                                                                                                                                                                            | Specifies the attributes to be attached to the widget's root element           |
| `height`           | string                  | ""                                                                                                                                                                                                            | Specifies the widget's height                                                  |
| `labelKey`         | string                  | ""                                                                                                                                                                                                            | Specifies the data field whose values should be displayed                      |
| `loading`          | boolean                 | false                                                                                                                                                                                                         | Specifies whether to show the loading indicator                                |
| `onValueChanged`   | function                | undefined                                                                                                                                                                                                     | A function that is executed when a item is selected or selection is canceled   |
| `searchEnabled`    | boolean                 | true                                                                                                                                                                                                          | Specifies whether to display the Search input in the widget                    |
| `selectAllEnabled` | boolean                 | true                                                                                                                                                                                                          | Specifies whether to display the Select All button in the widget               |
| `selectionMode`    | string: single/multiple | multiple                                                                                                                                                                                                      | Specifies item selection mode                                                  |
| `store`            | array                   | []                                                                                                                                                                                                            | Binds the widget to data                                                       |
| `texts`            | object                  | {<br>search: "Search...",<br>clear: "Clear",<br>selectAll: "Select All",<br>deselectAll: "Deselect All",<br>items: "Item(s)",<br>selectedItems: "Item(s) selected",<br>noDataFound: "No data to display"<br>} | Strings that can be changed or localized in the widget                         |
| `title`            | string                  | ""                                                                                                                                                                                                            | The read-only option that holds the text displayed by the widget input element |
| `value`            | array                   | []                                                                                                                                                                                                            | Specifies the currently selected value(s)                                      |
| `valueKey`         | string                  | ""                                                                                                                                                                                                            | Specifies which data field provides unique values to the widget's value        |
| `width`            | string                  | ""                                                                                                                                                                                                            | Specifies the widget's width                                                   |

## License

MIT © [liccampanavd](https://github.com/liccampanavd)
