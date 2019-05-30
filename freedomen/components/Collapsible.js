import React, { Component } from 'react';
import {View, Text } from 'react-native' 
import Region from './Region'
import Accordion from 'react-native-collapsible/Accordion';

class Collapsible extends Component { 
    constructor (props) {
        super (props) 
        this.state = { 
            visual: props.visual,
            data: props.data,
            hidden: props.hidden,
            headProp: props.headProp,
            activeSections: [], 
        } 
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }
    _event = (params) => {
        this.props.event && this.props.event(params)
    }
    renderHeader = section => { 
        return  <View style={{backgroundColor: 'white', padding: 10, marginBottom: 1, paddingLeft: 15, paddingRight: 15}}>
            <Text>{section[this.state.headProp]}</Text>
        </View>
        
    } 
    _renderContent = section => {
        return <Region columns={this.state.hidden} data={section} event={this._event} />
    } 
    _updateSections = activeSections => { 
        this.setState({ activeSections });
    };
    
    render () {
        return (
            <Accordion 
                sections={this.state.data}
                activeSections={this.state.activeSections}  
                renderHeader={this.renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}

export default Collapsible