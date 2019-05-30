import React from 'react'
import { Picker} from 'react-native'
import constants from '../configs/constants'

class FdSelect extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, options, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value,
            label: item.label,
            prop: item.prop,
            options: item.options || []
        } 
        this._fresh = this._fresh.bind(this)
        this._change = this._change.bind(this)
        this._options = this._options.bind(this)
    } 
    _fresh (data) {
        this.setState(data)
    }
    _change () {
        return this.state.value
    }
    _options (options) {
        return options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />
        })
    }
    render () {
        return (
            <Picker
                selectedValue={this.state.value}
                style={[{ height: 50, width: 100 }]}
                onValueChange={(itemValue, itemIndex) => this.setState({value: itemValue})}>
                    {
                        this._options(this.state.options)
                    }
            </Picker>
        )
    }
}

export default FdSelect