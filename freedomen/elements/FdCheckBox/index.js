import React from 'react'
import {Text, View, TouchableHighlight, Image} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'

const checkedImage = require('../icon/checked.png');
const unCheckImage = require('../icon/uncheck.png');

const styleItems = [
    'width', 
    'height',  
    'borderColor',
    'borderWidth', 
]

export default class extends React.PureComponent { 
    constructor (props) {
        super (props)
        let item = props.item || {} 
        this.state = {
            type: item.type,
            prop: item.prop,
            value: item.value,
            options: util.correctOption(item.options) 
        }   

        this.style = this._style(item.style)   
           
    }

    componentWillReceiveProps(nextProps) { 
        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)   
    } 
 
    _style = (style) => {
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(this.state.value, this.state.data))
        }

        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }

        return newStyle
    }
    render () { 
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.checkClick()}>
                <Image source={ this.state.value ? checkedImage : checkImage} style={{height: 12, width: 12}}/>
            </TouchableHighlight>
        )
    }
} 