import React from 'react'
import {ScrollView, View, TouchableOpacity, Text} from 'react-native' 
const checked = require('./icon/checked.png')
const uncheck = require('./icon/uncheck.png')
import CheckBox from '../modules/checkbox'
import theme from '../config/theme'
const styleItems = [ 
    'height',  //
    'width' //
]

class FdBreadcrumb extends React.PureComponent {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: item.value,
            options: this._resetOptions(item.options), 
        }   
        this.style = this._style(item.style)   
           
    } 
    _resetOptions = (options) => {
        if (!options)
            return []
        else if (Array.isArray(options) && options.length !== 0) {
            if (typeof options[0] === 'string')  
                return options.map(option => {
                    return {prop: option, value: option}
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
         alert(JSON.stringify(data)) 
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
        return (<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
             {
                (this.state.options|| []).map((data, key) => {
                    return  key != this.state.options.length - 1 ? <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {this._press(data)}} key={key}>
                            <Text style={{color: theme.color.primaryColor}}>{data.value}</Text>
                        </TouchableOpacity>
                        <Text> / </Text>
                    </View> : <Text>{data.value}</Text> 
                 })
             }
        </ScrollView>)
    }
}

export default FdBreadcrumb