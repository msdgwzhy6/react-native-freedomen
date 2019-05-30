import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import Region from './Region'
import theme from '../config/theme' 
class Views extends Component { 

    constructor (props) {
        super (props)
 
        this.state = {
            columns: props.columns || [],  
            data: props.data || {},
            type: props.type
        } 
    }
    _event = (params) => {
        // alert(JSON.stringify(params))
        this.props.event && this.props.event(params)
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        })
    } 
    render () {
        let { columns, data } = this.state
         
        return data.map((d, index) => {
            return <Region columns={columns} data={d} key={index} event={this._event} style={this.props.style} /> 
        }) 
    }
}

export default Views