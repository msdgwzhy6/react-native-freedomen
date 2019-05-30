import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../config/theme'
const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10
    }, 
    item_activity: { 
        borderBottomWidth: 2.5, 
        borderBottomColor: theme.color.primaryColor,
        color: theme.color.primaryColor,
    }
})
class Segment extends React.Component {
    
    constructor (props) {
        super (props)
        this.state = {
            columns: props.columns,
            activity: props.activity || props.columns[0].prop
        }
        this._button = this._button.bind(this)
        this._press = this._press.bind(this)
    }
    _press (prop) { 
        this.setState({
            activity: prop
        })
       
        this.props.click && this.props.click(prop) 
    }
    
    _button (item, key) {
        return (
            <TouchableOpacity style={{flex: 1}}  onPress={ () => { this._press(item.prop) } } key={key}> 
                <View style={[styles.item, item.prop === this.state.activity && this.props.showBottom && styles.item_activity]} > 
                    <Text style={[{color: '#212121', fontSize: this.props.primary ? 14 : 16 }, !this.props.primary && {fontWeight: 'bold'},item.prop === this.state.activity && {color: theme.color.primaryColor, fontSize: this.props.primary ? 16 : 18}]}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let { columns } = this.state
        let items = columns.map((column, key) => {
            return this._button(column, key)
        })
        return (
            <View style={[styles.main, this.props.style]}>
                { items }
            </View>
        )
    }
}

export default Segment