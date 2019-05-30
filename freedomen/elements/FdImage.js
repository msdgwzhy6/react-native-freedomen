import React from 'react'
import {Image, ImageBackground} from 'react-native' 
import util from '../utils/util'
const styleItems = [
    'opacity', //设置不透明度0.0(透明)-1.0(完全不透明)
    'overflow', //设置图片尺寸超过容器可以设置显示或者隐藏(‘visible’,’hidden’)
    'borderWidth', // 
    'borderRadius', // 
    'resizeMode',
    'height',  //
    'width' //
]

class FdImage extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.filter ? item.filter(item.value) : item.value,
        }
         
        this.style = this._style(item.style) 
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.item.value
        })
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
        let image
        if (typeof this.state.value === 'number')
            image = this.state.value
        else 
            image = {uri: this.props.item.baseUrl !== void 0 ? this.props.item.baseUrl + this.state.value : this.state.value}
    
        return ( 
            <Image source={image} style={[{width: 80, height: 80}, this.style]}/>  
        )
    }
}

export default FdImage