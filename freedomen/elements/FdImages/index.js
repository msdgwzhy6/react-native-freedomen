import React from 'react'
import Image from '../FdImage'
import {TouchableWithoutFeedback, View} from 'react-native' 
import util from '../../utils/util'
const styleItems = [
    'margin',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'marginTop',
    'padding',
    'paddingLeft',
    'paddingRight', 
    'paddingTop', 
    'paddingBottom', 

]
class FdImage extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value, 
            style: item.style,
            data: item.$data
        }
    }

    _fresh = (data) => {
        this.setState(data)
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            value: nextProps.item.value
        })
    } 
    _press = (value, type) => {
        this.props.event && this.props.event({type: type, prop: this.props.item.prop, value: value})
    }
    render () {
        return ( 
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {
                (this.state.value || []).map((ret, key) => {
                    return <TouchableWithoutFeedback 
                            onPress={() => {this._press(ret, 'press')}} 
                            onPressIn={() => {this._press(ret, 'pressIn')}}
                            onPressOut={() => {this._press(ret, 'pressOut')}}
                            onLongPress={() => {this._press(ret, 'longPress')}}
                            key={key}>
                        <View style={[ util.makeStyle(this.state.style, ...styleItems)]}>
                            <Image item={{
                                value: ret, 
                                style: this.state.style, 
                                filter: this.props.item.filter, 
                                $data: this.state.$data}} />
                        </View>
                    </TouchableWithoutFeedback>
                })
            }
            </View>
        )
    }
}

export default FdImage