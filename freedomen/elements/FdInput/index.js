import React from 'react'
import {Text,TextInput} from 'react-native' 
import util from '../../utils/util'

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
            data: item.$data,
            keyboardType: item.keyboardType,
            placeholder: item.placeholder
        }  

        this.style = this._style(item.style) 
    }
    _fresh = (data) => {
        this.setState({
            value: data
        })
    } 
    _change = (text) => { 

        if (this.props.item.style && typeof this.props.item.style === 'function')
            this.style = this._style(this.props.item.style, text)

        this.setState({
            value: text
        }, () => {
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: text
            })
        })

    }
    _style = (style, value) => {
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(value !== void 0 ? value : this.state.value, this.state.data))
        }

        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }
        return newStyle
    }
    componentWillReceiveProps(nextProp) { 

    }
    render () {
        let style = {}  
        
        return ( 
            <TextInput  
                underlineColorAndroid="transparent" 
                keyboardType={this.props.item.type === 'input-password' ? 'default' : this.state.keyboardType || 'phone-pad'}   
                placeholder={this.state.placeholder} 
                placeholderTextColor={this.props.item.placeholderTextColor || '#C0C0C0'}
                autoFocus={this.props.item.focus}
                autoCorrect={false} 
                autoCapitalize={'none'}  
                secureTextEntry={this.props.item.type === 'input-password'}
                clearButtonMode={'while-editing'} 
                style={[style, this.style]} 
                value={this.state.value}  
                onChangeText={this._change}/>
            )
    }
}

export default FdInput