import React from 'react'
import {Text} from 'react-native'
import util from '../utils/util' 
import DatePicker from 'react-native-datepicker' 
const styleItems = [
    'color', //字体颜色
    'fontSize', //字体大小
    'fontFamily', //字体
    'fontStyle', //字的样式（normal：正常，italic：斜体）
    'fontWeight', //设置粗体（normal：正常，bold：粗体: 100，200，300， 400， 500， 600， 700， 800， 900）
    'lineHeight', //行高
    'textAlign', //文字对其方式（auto：自动对齐left：左对齐right：右对齐 center：居中对齐）
    'textDecorationLine' //下划线和删除线样式（none：无线underline：下划线line-through：删除线 underline ine-through：下划线和删除线） 
]
 
class FdPickDate extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: item.value,  
        }   
        this.style = this._style(item.style)   
           
    } 
    _fresh = (data) => {
        this.setState(data)
    }
    _change = () => {

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
        }
        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }
        return newStyle
    }
    _change = (date)  => {  
        this.setState({
            value: date
        })
        console.warn(this.state.value)
        this.props.change && this.props.change({
            prop: this.state.prop,
            value: date
        })
    }

    render () { 
        return (
            <DatePicker
                style={[this.style]}
                date={this.state.value}
                mode={this.props.item.type || "date"}
                placeholder={'请选择'}
                customStyles={{dateInput:{
                    borderWidth: 0,  
                },dateTouchBody: {marginLeft: 5}}}
                androidMode="spinner"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}
                minDate="1900-01-01"
                maxDate="2096-01-01" 
                onDateChange={this._change}
            /> 
        )
    }
}

export default FdPickDate