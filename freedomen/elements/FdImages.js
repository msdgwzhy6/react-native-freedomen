import React from 'react' 
import Image from './FdImage'
import {View} from 'react-native'
const styleItems = [
    'opacity', //设置不透明度0.0(透明)-1.0(完全不透明)
    'overflow', //设置图片尺寸超过容器可以设置显示或者隐藏(‘visible’,’hidden’)
    'borderWidth', // 
    'borderRadius', // 
    'resizeMode',
    'height',  //
    'width' //
]

class FdImages extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value,
            label: item.label, 
            style: item.style
        } 
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.item.value
        })
    }
 
    render () {
        return ( 
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {
                (this.state.value || []).map((ret, key) => {
                    return <View key={key} style={{margin: 5}}>
                        <Image item={{value: ret, style: this.state.style}} />
                    </View>
                })
            }
            </View>
        )
    }
}

export default FdImages