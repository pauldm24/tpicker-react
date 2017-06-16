import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Picker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerVal: props.value !== undefined ? props.value : '',
            init: '',
            max: 12,
            min: 0,
            step: props.step ? props.step : 1
        }
    }

    componentWillMount() {
        switch (this.props.option) {
            case 'hour':
                this.setState({max: 12, min: 1});
                break
            case 'min':
                this.setState({max: 59, min: 0});
                break
            case 'sec':
                this.setState({max: 59, min: 0});
                break
            default:
                break
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pickerVal: nextProps.value !== undefined ? nextProps.value : ''})
    }

    _handleChange(type){
        let val = 0
        let currentVal = this.state.pickerVal
        const { option, position, range } = this.props
        const { min, max } = this.state
        let optionName = range ? `${option}${position}` : option
        if (option === 'lbl') {
            switch(type) {
                case 'inc':
                    if (currentVal === 'AM') return
                    this.setState({pickerVal: 'AM'})
                    this.props.onChange(optionName, 'AM')
                    break
                case 'dec':
                    if (currentVal === 'PM') return
                    this.setState({pickerVal: 'PM'})
                    this.props.onChange(optionName, 'PM')
                    break
                default:
                    break
            }

            return
        }

        let pickerVal = parseInt(currentVal)
        let customMax = min === 0 && this.props.step > 1 ? (max + 1) - this.props.step : max;
        switch(type) {
            case 'inc':
                val = pickerVal >= 0 ? pickerVal + this.state.step : min
                if (val > customMax) {
                    val = min
                }
                this.setState({pickerVal: val < 10 ? `0${val}` : val})
                this.props.onChange(optionName, val)
                break
            case 'dec':
                val = pickerVal > min ? pickerVal - this.state.step : customMax
                this.setState({pickerVal: val < 10 ? `0${val}` : val})
                this.props.onChange(optionName, val)
                break
            default:
                break
        }
    }

    render() {
        const { min, pickerVal } = this.state
        let pickVal

        if (this.props.option !== 'lbl') {
            pickVal = this.props.value !== undefined ? this.props.value : pickerVal
            pickVal = pickVal < 10 ? `0${pickVal}` : pickVal
        } else {
            pickVal = this.props.value ? this.props.value : pickerVal
        }

        return (
            <div className="picker-item">
                <div className="picker-item-wrap">
                    <div className={classnames('icon-wrap')}
                        onClick={() => this._handleChange('inc')}>
                        <i className="fa fa-chevron-up"></i>
                    </div>
                    <input
                        type="text"
                        value={pickVal}
                        readOnly
                    />
                    <div className={classnames('icon-wrap')}
                        onClick={() => this._handleChange('dec')}>
                        <i className="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        )
    }
}

Picker.propTypes = {
    option: PropTypes.oneOf('hour', 'min', 'sec', 'lbl').isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    step: PropTypes.number,
    range: PropTypes.bool,
    position: PropTypes.oneOf('Start', 'End')
}

Picker.defaultProps = {
    range: false
}
