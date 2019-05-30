import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import constants from '../configs/constants'
import Picker from 'react-native-picker';
import region from '../configs/region'
const styleItems = [
    'height',
    'width'
]

class FdSelectAddress extends React.Component { 
    constructor (props) {

        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view 
        this.state = {
            prop: item.prop,
            value: item.value ? (Array.isArray(item.value) ? item.value : (item.value || '').split(',')) : item.value,
            label: item.label,
            placeholder: item.placeholder
        } 

        this.citys = []
		region.prov.map((pname, i) => {
			let prov = {};
			let citys = [];

			region.city[i].map((cname, j) => {
				let city = {};
				city[cname] = region.district[i][j];
				citys.push(city);
			})

			prov[pname] = citys;
			this.citys.push(prov);
		})
 
        this._style = this._style.bind(this) 
        this._text = this._text.bind(this)
        this.style = this._style(item.style)  

        Picker.init({
			pickerConfirmBtnText: '确定',
			pickerCancelBtnText: '取消',
			pickerTitleText: '选择地区',
            pickerData: this.citys,
            selectedValue: this.state.value,
            onPickerConfirm: pickedValue => {
                this.setState({value: pickedValue})

                this.props.change && this.props.change({
                        prop: this.state.prop,
                        value: pickedValue.toString()
                }) 
            },
        });
    } 
    _text (value) {
        
        if (!value) 
            return null
        let text = ""
        value.map(i => {
            text += i + ' '
        })
        return text
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
    render () {
        return (
                <TouchableOpacity onPress={() => {Picker.show()}} >
                    <View style={this.style}>
                        <Text style={{color: 'black'}}>{this._text(this.state.value) || this.state.placeholder}</Text>
                    </View>
                </TouchableOpacity>
            )
    }
}

export default FdSelectAddress