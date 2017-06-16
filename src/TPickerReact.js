import './main.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Picker from './components/Picker'
import TPickerRangeReact from './TPickerRangeReact'

export default class TPickerReact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hour: props.hour ? props.hour : 8,
            min: props.minutes ? props.minutes : 0,
            sec: 0,
            lbl: props.meridiem ? props.meridiem : 'AM',

            stepHour: 1,
            stepMin: props.minutesStep ? props.minutesStep : 15,
            stepSec: 15
        }

        this._handleChange = this._handleChange.bind(this)
    }

    _handleChange(type, val) {
        this.setState({[type]: val})
    }

    componentWillUpdate(_, nextState) {
        let lbl, hour, min, sec
        // Toggle AM | PM
        if (this.state.hour === 11 && nextState.hour === 12 && this.state.lbl === nextState.lbl) {
            lbl = this.state.lbl === 'PM' ? 'AM' : 'PM'
            this.setState({lbl})
        } else if (this.state.hour === 12 && nextState.hour === 11 && this.state.lbl === nextState.lbl) {
            lbl = this.state.lbl === 'PM' ? 'AM' : 'PM'
            this.setState({lbl})
        }

        // Add Hour
        if (this.state.min === 60 - this.state.stepMin && nextState.min === 0) {
            hour = this.state.hour + 1
            if (hour > 12) {
                // Reset
                hour = 1
            }
            this.setState({hour})
        } else if (this.state.min === 0 && nextState.min === 60 -this.state.stepMin) {
            hour = this.state.hour - 1
            if (hour < 1) {
                // Reset
                hour = 12
            }
            this.setState({hour})
        }

        // Add Min
        if (this.state.sec === 60 - this.state.stepSec && nextState.sec === 0) {
            min = this.state.min + this.state.stepMin
            if (min > 60) {
                // Reset
                min = 0
            }
            this.setState({min})
        } else if (this.state.sec === 0 && nextState.sec === 60 -this.state.stepSec) {
            min = this.state.min - 1
            if (min < 0) {
                // Reset
                min = 59
            }
            this.setState({min})
        }
    }

    componentWillReceiveProps(nextProps) {
        const { hour, minutes, meridiem, minutesStep } = this.props
        this.setState({hour, min: minutes, lbl: meridiem, stepMin: minutesStep})
    }

    componentDidUpdate() {
        const { name } = this.props
        let min, sec, time
        const { hour, lbl } = this.state
        min = this.state.min < 10 ? `0${this.state.min}` : this.state.min
        sec = this.state.sec < 10 ? `0${this.state.sec}` : this.state.sec
        if (this.props.seconds) {
            time = `${hour}:${min}:${sec} ${lbl}`
        } else {
            time = `${hour}:${min} ${lbl}`
        }

        this.props.onChange(time)
    }

    render() {
        return (
            <div className="tpicker-wrapper">
                <Picker option="hour" value={this.state.hour} step={this.state.stepHour} onChange={this._handleChange} />
                <Picker option="min" value={this.state.min} step={this.state.stepMin} onChange={this._handleChange} />
                <Picker option="lbl" value={this.state.lbl} onChange={this._handleChange} />
            </div>
        )
    }
}

export { TPickerReact, TPickerRangeReact, Picker }

TPickerReact.propTypes = {
    onChange: PropTypes.func.isRequired,
    seconds: PropTypes.bool.isRequired,
    name: PropTypes.string,
    hour: PropTypes.number,
    minutes: PropTypes.number,
    meridiem: PropTypes.oneOf('AM', 'PM'),
    minutesStep: PropTypes.number
}

TPickerReact.defaultProps = {
    onChange: (time) => {},
    seconds: false,
    name: 'key',
    minutesStep: 15
}
