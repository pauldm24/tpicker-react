# React Custom Date Picker

Project dependecies

* react
* font-awesome

> `TPickerReact` return formatted time eg. `8:45 AM`
>
> `TPickerRangeReact` return a javascript object

```javascript
{ 
    start: "7:15 AM",
    end: "9:00 AM",
    name: "picker1"
}
```

### Usage

Install the package.
```bash
yarn add tpicker-react # npm install tpicker-react --save
```

```javascript

import React, { Component } from 'react'
import { render } from 'react-dom'
import { TPickerReact as TimePicker, TPickerRangeReact as TimeRange } from 'tpicker-react'

const App = () => {
    return (
        <TimePicker />
    )
}

render(<App />, document.getElementById('root'))

```

Please see demo for more detail.


### Demo

```bash
git clone git@github.com:pauldm24/tpicker-react.git
cd tpicker-react
cd demo
yarn install # npm install

```

Browse @ [http://localhost:8081](http://localhost:8081 "Open")

#### TODO:
Add validation on Date Range (TPickerRangeReact)


### Note:
This is not production ready package, if you want it to use, use it on your own risk.

