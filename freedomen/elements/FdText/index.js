import React from 'react'
import { Text } from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme' 

const styleItems = [
    'color', //字体颜色
    'fontSize', //字体大小
    'fontFamily', //字体
    'fontStyle', //字的样式（normal：正常，italic：斜体）
    'fontWeight', //设置粗体（normal：正常，bold：粗体: 100，200，300， 400， 500， 600， 700， 800， 900）
    'lineHeight', //行高
    'textAlign', //文字对其方式（auto：自动对齐left：左对齐right：右对齐 center：居中对齐）
    'textDecorationLine', //下划线和删除线样式（none：无线underline：下划线line-through：删除线 underline ine-through：下划线和删除线） 
    'textShadowOffset',
    'textShadowRadius'
]

class FdText extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: item.value,
            data: item.$data
        }   
        this.style = this._style(item.style)   
           
    }

    componentWillReceiveProps(nextProps) { 

        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)   
            
        this.setState({
            value: nextProps.item.value
        })
    }

    _fresh = (data) => {
        this.setState(data)
    } 

    _format = (format, date) => {
        return util.formatDate.format(new Date(date), format)
    }

    _filter = () => {
        let obj = this.props.item.filter(this.state.value) 
        
        if (typeof obj == 'string')
            return obj
        else return obj[this.state.value + '']
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
            <Text style={[this.style]}>  
                {
                    this.props.item.filter 
                        ? (typeof this.props.item.filter === 'string') 
                                ? this._format(this.props.item.filter, this.state.value) 
                                : this._filter()
                        : this.state.value
                }
            </Text>
        )
    }
}

export default FdText