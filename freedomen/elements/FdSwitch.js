import React from 'react'
import { Switch } from 'react-native' 

class FdSwitch extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, options, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: !!item.value, 
            prop: item.prop, 
        }
         
        this._change = this._change.bind(this) 
    } 
    _change (value) {
        this.setState({
            value: value
        })
        this.props.change && this.props.change({
            prop: this.state.prop,
            value: value ? 1 : 0
        })
    } 
    render () {
        return (
            <Switch thumbColor={'blue'} trackColor={{false: '#ccc', true: 'blue'}} value={this.state.value} onValueChange={this._change}/>
        )
    }
}

export default FdSwitch