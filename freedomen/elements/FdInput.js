import React from 'react'
import {Text,TextInput} from 'react-native'
import constants from '../configs/constants'
const styleItems = [
    'height',
    'width',
    'color',
    'borderWidth',
    'marginLeft',
    'marginTop',
    'marginRight',
    'marginBottom',
    'margin',
]

class FdInput extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            password: item.password,
            prop: item.prop,
            value: item.value,
            label: item.label,
            keyboardType: item.keyboardType,
            placeholder: item.placeholder
        } 
        this._fresh = this._fresh.bind(this)
        this._change = this._change.bind(this)
        this._style = this._style.bind(this)

        this.style = this._style(item.style)
        this._change = this._change.bind(this)
    }
    _fresh (data) {
        this.setState({value: data})
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
    componentWillReceiveProps(nextProp) {
        // if (nextProp.item.value != this.state.value)
        //     this.setState({
        //         value: nextProp.item.value 
        //     })
    }
    render () {
        let style = {}  
        return ( 
            <TextInput  
                underlineColorAndroid="transparent" 
                maxLength={this.state.length || 120} 
                placeholder={this.state.placeholder} 
                autoCorrect={false} 
                placeholderTextColor={this.props.item.placeholderTextColor || '#C0C0C0'}
                autoFocus={this.props.item.focus}
                autoCapitalize={'none'} 
                returnKeyType={'done'} 
                multiline={true}
                numberOfLines={4}
                password={this.state.password}
                clearButtonMode={'while-editing'} 
                style={[style, this.style]} 
                value={this.state.value}  
                onChangeText={this._change}/>
            )
    }
}

export default FdInput