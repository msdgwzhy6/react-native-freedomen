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
 

class FdCounter extends React.PureComponent { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        let value 
        try {
            value = parseInt(item.value) || 0
        } catch(e) {}
        this.state = {
            prop: item.prop,
            value: value,
            label: item.label,
            min: item.min || 0,
            max: item.max || 100,
            step: item.step || 1,
            data: item.$data
        }   
        this.style = this._style(item.style)   
           
    }
    componentWillReceiveProps(nextProps) { 
        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)   
    } 
    _change = (cm) => {
        if (cm == 'sub') {
            let value = this.state.value
            value = value - this.state.step < this.state.min ? this.state.min : value - this.state.step
            this.setState({
                value: value
            }, () => {
                this.props.change && this.props.change({
                    prop: this.state.prop,
                    value: value
                })
            })
        } else if (cm == 'add') {
            let value = this.state.value
            value = value + this.state.step > this.state.max ? this.state.max : value + this.state.step
            this.setState({
                value: value
            }, () => {
                this.props.change && this.props.change({
                    prop: this.state.prop,
                    value: value
                })
            })
        }
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
        return (<View style={[{width: 80, height: theme.size.itemWHeight, borderColor: '#ccc', borderWidth: 0.3, borderRadius: 5, flexDirection: 'row'}, this.style]}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {this._change('sub')}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, borderRightColor: '#ccc', borderRightWidth: 0.3}}><Text> - </Text></View>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{this.state.value}</Text>
            </View>
            <TouchableOpacity style={{flex: 1}} onPress={() => {this._change('add')}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, borderLeftColor: '#ccc', borderLeftWidth: 0.3}}><Text> + </Text></View>
            </TouchableOpacity>
        </View>)
    }
}

export default FdCounter