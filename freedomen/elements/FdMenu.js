import React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import util from '../utils/util'
import theme from '../config/theme'
const styleItems = [
    'width', //字体颜色
    'height', //字体大小
    'borderColor',
    'borderWidth'
]
import ModalDropdown from '../modules/menu'

class FdMenu extends React.Component { 
    constructor (props) {
        super (props)
        //item = {value: 'text', prop: 'gg', options: ['dd','aa',{prop: 'g', value: 'c'}]}
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: item.value,
            options: this._resetOptions(item.options)
        }   
        this.style = this._style(item.style)    
    }
    _resetValue = (value) => {
        if (!value)
            return []
        else if (Array.isArray(value))
            return value
        else return [value]
    }
    _resetOptions = (options) => {
        if (!options)
            return []

        else if (Array.isArray(options) && options.length !== 0) {
            if (typeof options[0] === 'string')  
                this.options =  options.map(option => {
                    console.warn(option)
                    return {prop: option, value: option}
                })
            else 
                this.options = options 

            return this.options.map(option => {
                return option.value
            }) 
        }
    }
    componentWillReceiveProps(nextProps) {   
        this.setState({
            options: this._resetOptions(nextProps.item.options)
        })
    } 
    _press = (data) => {
        
    }
    _style = (style) => {
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
        return ( <ModalDropdown options={this.state.options} onSelect={(index) => { 
                this.setState({value: this.options[index].value})
                this.props.event && this.props.event({type: 'press', prop: this.state.prop, value: this.options[index].value})
            }}>
            <View style={{flexDirection: 'row', backgroundColor: 'white', alignItems: 'center'}}>
                <Text style={{color: '#212121', marginRight: 5}}>{this.state.value}</Text>
                <Image source={require('../assets/xia.png')} style={{height: 14, width: 12, resizeMode: 'stretch'}} />
            </View>
        </ModalDropdown>
        )
    }
}

export default FdMenu