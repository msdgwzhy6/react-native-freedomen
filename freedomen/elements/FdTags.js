import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import util from '../utils/util'
import theme from '../config/theme'
const styleItems = [
    'width', //字体颜色
    'height', //字体大小
    'borderColor',
    'borderWidth'
]
 

class FdCounter extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: this._resetValue(item.value),
            options: this._resetOptions(item.options),
            size: item.size || 1
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
                return options.map(option => {
                    return {key: option, value: option}
                })
            else return options 
        }
    }
    componentWillReceiveProps(nextProps) {   
        this.setState({
            options: this._resetOptions(nextProps.item.options)
        })
    } 
    _press = (data) => {
        let value = this.state.value 
        if (this.state.size === 1)  {
            let index = value.indexOf(data.key)

            if (index == -1 && value.length >= 1) {
                value = [data.key]
            } else if (index == -1) {
                value.push(data.key)
            } else {
                value.splice(index, 1)
            }
            
            this.setState({
                value: value
            },() => {  
                this.props.change && this.props.change({
                    prop: this.state.prop,
                    value: value.length != 0 ? value[0]: ''
                })
            })
        } else {
                //其它size不支持
        }
       
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
        return (<View style={[{flexDirection: 'row',flexWrap: 'wrap'}, this.style]}>
             {
                (this.state.options|| []).map((data, key) => {
                     return <TouchableOpacity onPress={() => {this._press(data)}} key={key} style={[{height: theme.size.itemWHeight, margin: theme.size.textPadding, borderColor: '#ccc', borderWidth: 0.5, borderRadius: 5}, this.state.value.indexOf(data.key) != -1 && {backgroundColor: theme.color.primaryColor}, this.style]}>
                        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={[{paddingLeft: theme.size.textPadding, paddingRight: theme.size.textPadding}, this.state.value.indexOf(data.key) != -1 && {color: 'white'}]}>{data.value}</Text>
                        </View>
                     </TouchableOpacity>
                 })
             }
        </View>)
    }
}

export default FdCounter