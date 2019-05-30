import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import FdImage from './FdImage'
import FdText from './FdText'
import util from '../utils/util'
import theme from '../config/theme'
const styles = {
    'button-primary': { 
       height: theme.size.itemWHeight,
       alignItems: 'center',
       justifyContent: 'center', 
       backgroundColor: theme.color.primaryColor,
       borderRadius: 16, 
    }, 
    'button-cancel': { 
        borderColor: theme.color.primaryColor,
        height: theme.size.itemWHeight, 
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.8,
        borderRadius: 16
    },
    'button-disabled': {
        height: theme.size.itemWHeight,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: theme.color.disableColor,
        borderRadius: 16, 
    }
}
class Button extends React.Component {
    constructor (props) { 
        super (props)
    }
    _getXmlbyType = (item) =>{

        let jsx = null

        switch (item.type) {  
            case 'button-text': 
                jsx = <FdText item={item} /> 
                break
            case 'button-image':
                jsx = <FdImage item={item} />
                break 
            default: 
                jsx = <FdText item={item} />
                break
        }

        return jsx
    }
    _press = (type) => {
        this.props.event && this.props.event({type: type, prop: this.props.item.prop, value: this.props.item.value})
    }
    render () {
        let jsx = this._getXmlbyType (this.props.item) 

        return ( 
            <View style={util.makeStyle(styles[this.props.item.type], 'height', 'width')}>
                {   
                    this.props.item.type !== 'button-disabled' 
                        ? <TouchableOpacity onPress={() => {this._press('press')}} onLongPress={() => {this._press('longPress')}}>
                            <View style={[styles[this.props.item.type], this.props.item.style]}>
                                {jsx}
                            </View>
                        </TouchableOpacity> 
                        : <View style={[styles[this.props.item.type], this.props.item.style]}>
                            {jsx}
                        </View> 
                }
            </View>
        )
    }
}

export default Button