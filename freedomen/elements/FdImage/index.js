import React from 'react'
import { Image } from 'react-native'  
import util from '../../utils/util' 
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
            value: item.value,
            label: item.label, 
            data: item.$data
        }
        
        this._fresh = this._fresh.bind(this) 
        this._style = this._style.bind(this)

        this.style = this._style(item.style) 
    }

    _filter = (value) => {
        let obj = this.props.item.filter(value, this.state.data) 
        if (typeof obj == 'object') { 
            return obj[value + '']
        } else {
            return obj
        }
    }

    _fresh (data) {
        this.setState(data)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)    
        this.setState({
            value: nextProps.item.value
        })
    }

    _style (style) {

        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            console.warn(this.state.value)
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
        let image, value = this.state.value
         
        if (this.props.item.filter) {
            value = this._filter(this.state.value)
        }

        if (typeof value === 'number')
            image = value
        else 
            image = {uri: this.props.item.baseUrl !== void 0 ? this.props.item.baseUrl + value : value}
    
        return (
            <Image source={image} style={[{width: 80, height: 80}, this.style]}/> 
        )
    }
}

export default FdImage