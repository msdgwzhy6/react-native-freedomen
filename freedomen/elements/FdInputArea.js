import React from 'react'
import {Text,TextInput} from 'react-native'
import constants from '../configs/constants'
const styleItems = [
    'height',
    'width',
    'borderWidth',
    'marginLeft',
    'marginTop',
    'marginRigth',
    'marginBottom',
    'margin',
]

class FdInputArea extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            password: item.password,
            prop: item.prop,
            value: item.value, 
            row: item.row || 2,
            placeholder: item.placeholder
        } 
        this._fresh = this._fresh.bind(this)
        this._change = this._change.bind(this)
        this._style = this._style.bind(this)

        this.style = this._style(item.style)
        this._change = this._change.bind(this)
    }
    _fresh (data) {
        this.setState(data)
    }
    _change (text) {
        this.setState({
            value: text
        })

        this.props.change && this.props.change({
            prop: this.state.prop,
            value: text
        })
    }
    _style (style) {
        if (!style) {
            return {}
        }
        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }

        return newStyle
    }
    render () {
        let style = { 
            padding: 2, 
            paddingLeft: 5, 
        } 
        if (this.props.item.size == 'normal') {
            style = { 
                borderWidth: 1, 
                height: 28 * this.props.item.row,
                padding: 2,
                paddingLeft: 5,
                borderColor: '#ccc',
                borderRadius: 4,
                margin: 5,
            } 
        } 
        return (<TextInput  
                    underlineColorAndroid="transparent"  
                    multiline={true} 
                    maxLength={this.state.length || 220} 
                    placeholder={this.state.placeholder} 
                    autoCorrect={false} 
                    autoFocus={this.props.item.focus} 
                    clearButtonMode={'while-editing'} 
                    autoCapitalize={'none'} 
                    returnKeyType={'done'} 
                    style={[style,this.style]} 
                    value={this.state.value}  
                    onChangeText={this._change}/>
                )
    }
}

export default FdInputArea