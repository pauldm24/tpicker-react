import React, { Component } from 'react'
import { TPickerReact as TimePicker, TPickerRangeReact as TimeRange } from '../../build'
import moment from 'moment'
import _ from 'lodash'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            times: []
        }

        this._pickerChange = this._pickerChange.bind(this)
        this._log = this._log.bind(this)
    }

    _pickerChange(time) {
        let times = this.state.times

        if (times.length > 0 && time.name) {
            let item = times.find(t => (t.name === time.name))

            if (!item) {
                times.push(time)
                this.setState({times})
            } else {
                let idx = times.indexOf(item)
                times.splice(idx, 1, time)
            }

        } else {
            times.push(time)
            this.setState({times})
        }
    }

    _log() {
        console.log(JSON.stringify(this.state.times, null, 4))
    }

    render() {
        let count = _.range(3)
        return (
            <div className="wrapper">
                {/* Optional name property */}
                {/* <TimePicker onChange={this._pickerChange} name="single" /> */}

                {/* Requred name property */}
                {
                    count.map(val => (
                        <TimeRange key={val} onChange={this._pickerChange} name={`picker${val}`} />
                    ))
                }
                <br />
                <button onClick={this._log}>Log Data to the Console</button>
            </div>
        )
    }
}
