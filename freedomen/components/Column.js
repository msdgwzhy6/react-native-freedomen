import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import Region from './Region'
import theme from '../config/theme'
const styles = {
    defaultStyle: {
        height: theme.size.columnHeight, 
        backgroundColor: '#FFFFFF',
        marginBottom: 2,
        justifyContent: 'center'
    }
} 
class Column extends Component { 

    constructor (props) {
        super (props)
 
        this.state = {
            columns: props.columns || [],  
            data: props.data || {}
        } 
    }
    _event = (params) => {
        this.props.event && this.props.event(params)
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        })
    } 
    render () {
        let { columns, data } = this.state
         
        let jsx = data.map((d, index) => {
            return <Region style={this.props.style} columns={columns} data={d} key={index} style={styles.defaultStyle} event={this._event} /> 
        }) 
        return jsx 
    }
}

export default Column