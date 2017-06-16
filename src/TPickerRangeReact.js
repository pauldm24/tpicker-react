import './main.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Picker from './components/Picker'

export default class TPickerRangeReact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hourStart: 10,
            minStart: 0,
            secStart: 0,
            lblStart: 'AM',

            stepHourStart: 1,
            stepMinStart: 15,
            stepSecStart: 15,


            hourEnd: 11,
            minEnd: 0,
            secEnd: 0,
            lblEnd: 'AM',

            stepHourEnd: 1,
            stepMinEnd: 15,
            stepSecEnd: 15
        }

        this._handleChange = this._handleChange.bind(this)
        this._feedUpdate = this._feedUpdate.bind(this)
    }

    _handleChange(type, val) {
        this.setState({[type]: val})
    }

    componentWillMount() {
        this._feedUpdate()
    }

    componentWillUpdate(_, nextState) {
        let lblStart, hourStart, minStart, secStart
        let lblEnd, hourEnd, minEnd, secEnd
        // Toggle AM | PM
        if (this.state.hourStart === 11 && nextState.hourStart === 12 && this.state.lblStart === nextState.lblStart) {
            lblStart = this.state.lblStart === 'PM' ? 'AM' : 'PM'
            this.setState({lblStart})
        } else if (this.state.hourStart === 12 && nextState.hourStart === 11 && this.state.lblStart === nextState.lblStart) {
            lblStart = this.state.lblStart === 'PM' ? 'AM' : 'PM'
            this.setState({lblStart})
        }

        // Add Hour
        if (this.state.minStart === 60 - this.state.stepMinStart && nextState.minStart === 0) {
            hourStart = this.state.hourStart + 1
            if (hourStart > 12) {
                // Reset
                hourStart = 1
            }
            this.setState({hourStart})
        } else if (this.state.minStart === 0 && nextState.minStart === 60 -this.state.stepMinStart) {
            hourStart = this.state.hourStart - 1
            if (hourStart < 1) {
                // Reset
                hourStart = 12
            }
            this.setState({hourStart})
        }

        // Add Min
        if (this.state.secStart === 60 - this.state.stepSecStart && nextState.secStart === 0) {
            minStart = this.state.minStart + this.state.stepMinStart
            if (minStart > 60) {
                // Reset
                minStart = 0
            }
            this.setState({minStart})
        } else if (this.state.secStart === 0 && nextState.secStart === 60 -this.state.stepSecStart) {
            minStart = this.state.minStart - 1
            if (minStart < 0) {
                // Reset
                minStart = 59
            }
            this.setState({minStart})
        }


        // Toggle AM | PM
        if (this.state.hourEnd === 11 && nextState.hourEnd === 12 && this.state.lblEnd === nextState.lblEnd) {
            lblEnd = this.state.lblEnd === 'PM' ? 'AM' : 'PM'
            this.setState({lblEnd})
        } else if (this.state.hourEnd === 12 && nextState.hourEnd === 11 && this.state.lblEnd === nextState.lblEnd) {
            lblEnd = this.state.lblEnd === 'PM' ? 'AM' : 'PM'
            this.setState({lblEnd})
        }

        // Add Hour
        if (this.state.minEnd === 60 - this.state.stepMinEnd && nextState.minEnd === 0) {
            hourEnd = this.state.hourEnd + 1
            if (hourEnd > 12) {
                // Reset
                hourEnd = 1
            }
            this.setState({hourEnd})
        } else if (this.state.minEnd === 0 && nextState.minEnd === 60 -this.state.stepMinEnd) {
            hourEnd = this.state.hourEnd - 1
            if (hourEnd < 1) {
                // Reset
                hourEnd = 12
            }
            this.setState({hourEnd})
        }

        // Add Min
        if (this.state.secEnd === 60 - this.state.stepSecEnd && nextState.secEnd === 0) {
            minEnd = this.state.minEnd + this.state.stepMinEnd
            if (minEnd > 60) {
                // Reset
                minEnd = 0
            }
            this.setState({minEnd})
        } else if (this.state.secEnd === 0 && nextState.secEnd === 60 -this.state.stepSecEnd) {
            minEnd = this.state.minEnd - 1
            if (minEnd < 0) {
                // Reset
                minEnd = 59
            }
            this.setState({minEnd})
        }
    }

    componentDidUpdate() {
        this._feedUpdate()
    }

    _feedUpdate() {
        const { name } = this.props
        let minStart, secStart, timeStart
        let minEnd, secEnd, timeEnd

        const { hourStart, lblStart } = this.state
        minStart = this.state.minStart < 10 ? `0${this.state.minStart}` : this.state.minStart
        secStart = this.state.secStart < 10 ? `0${this.state.secStart}` : this.state.secStart
        if (this.props.seconds) {
            timeStart = `${hourStart}:${minStart}:${secStart} ${lblStart}`
        } else {
            timeStart = `${hourStart}:${minStart} ${lblStart}`
        }


        const { hourEnd, lblEnd } = this.state
        minEnd = this.state.minEnd < 10 ? `0${this.state.minEnd}` : this.state.minEnd
        secEnd = this.state.secEnd < 10 ? `0${this.state.secEnd}` : this.state.secEnd
        if (this.props.seconds) {
            timeEnd = `${hourEnd}:${minEnd}:${secEnd} ${lblEnd}`
        } else {
            timeEnd = `${hourEnd}:${minEnd} ${lblEnd}`
        }

        this.props.onChange({start: timeStart, end: timeEnd, name})
    }

    render() {
        return (
            <div className="tpicker-wrapper range">
                <div>
                    <p className="title">Start</p>
                    <div>
                        <Picker option="hour"
                            range
                            position="Start"
                            value={this.state.hourStart}
                            step={this.state.stepHourStart}
                            onChange={this._handleChange} />
                        <Picker option="min" 
                            range
                            position="Start"
                            value={this.state.minStart}
                            step={this.state.stepMinStart}
                            onChange={this._handleChange} />
                        <Picker option="lbl"
                            range
                            position="Start"
                            value={this.state.lblStart}
                            onChange={this._handleChange} />
                    </div>
                </div>

                <div>
                    <p className="title">End</p>
                    <div>
                        <Picker option="hour"
                            range
                            position="End"
                            value={this.state.hourEnd}
                            step={this.state.stepHourEnd}
                            onChange={this._handleChange} />
                        <Picker option="min"
                            range
                            position="End"
                            value={this.state.minEnd}
                            step={this.state.stepMinEnd}
                            onChange={this._handleChange} />
                        <Picker option="lbl"
                            range
                            position="End"
                            value={this.state.lblEnd}
                            onChange={this._handleChange} />
                    </div>
                </div>
            </div>
        )
    }
}

TPickerRangeReact.propTypes = {
    onChange: PropTypes.func.isRequired,
    seconds: PropTypes.bool.isRequired,
    name: PropTypes.string
}

TPickerRangeReact.defaultProps = {
    onChange: (time) => {},
    seconds: false,
    name: 'name'
}
