import React from 'react'
import {Image, TouchableWithoutFeedback, View} from 'react-native' 
const checked = require('./icon/checked.png')
const uncheck = require('./icon/uncheck.png')
import CheckBox from '../modules/checkbox'
import theme from '../config/theme'
const styleItems = [ 
    'height',  //
    'width' //
]

class FdCheckBox extends React.PureComponent {
    constructor (props) {
        super (props)
        let item = props.item || {} 
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view 
        this.value = item.value
        this.state = {
            check: !!item.value,
            value: !!item.value,
            label: item.label, 
            prop: item.prop,
            onImage: item.onImage,
            offImage: item.offImage,
            label: item.label,
            on: item.on || 1,
            off: item.off || 0
        } 
        this._change = this._change.bind(this)
        this._style = this._style.bind(this) 
        this.style = this._style(item.style)
        this.here = false
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
    componentWillReceiveProps(nextProps) {   
         
    }
    _change () {   
        this.value = this.state.check ? this.state.on : this.state.off
        this.props.change && this.props.change({
            prop: this.state.prop,
            value: this.state.check ? this.state.on : this.state.off
        })   
    } 
    render () {  
        return ( 
            <CheckBox 
                onClick={()=> {   
                    this.setState({
                        check: !this.state.check
                    }, this._change)
                    
                }}
                isChecked={this.state.check}
                checkedImage={<Image source={checked} style={{height: theme.size.itemWHeight , width: theme.size.itemWHeight, resizeMode: 'stretch'}}/>}
                unCheckedImage={<Image source={uncheck} style={{height: theme.size.itemWHeight, width: theme.size.itemWHeight, resizeMode: 'stretch'}}/>}
        />
        )
    }
}

export default FdCheckBox