import React, { Component } from 'react';
import { ScrollView } from 'react-native'
import Region from './Region'
import theme from '../config/theme' 
class Scroll extends Component { 

    constructor (props) {
        super (props)
 
        this.state = {
            columns: props.columns || [],  
            data: props.data || {},
            type: props.type
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
            return <Region columns={columns} data={d} key={index} event={this._event} /> 
        }) 
        return (<ScrollView showsHorizontalScrollIndicator={false} style={[{flex: 1, backgroundColor: theme.color.backgroundColor}, this.props.style]} horizontal={this.props.type == 'scroll-x'}>{jsx}</ScrollView>)
    }
}

export default Scroll