import React, { Component } from 'react';
import * as Progress from 'react-native-progress'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';
import theme from '../config/theme'
const width =  Dimensions.get('window').width

class FdProgress extends Component {
	static defaultProps = {
		value: 0,
		checked: false,
		activeColor: '#57a6ef',
		label: ''
	}

	constructor(props) {
		super(props)
        let item = props.item || {}
		this.state = {
			value: item.value,
			prop: item.prop,
			style: item.style
		}
    }

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.item.value
		})
	}
 
	render() {
        let {value} = this.state
        let tag
        switch ((this.props.item || {}).type) {
            case 'progress-bar':
                tag = <Progress.Bar progress={value} width={this.state.style.width || 50} color={theme.color.primaryColor}/>
				break
			case 'progress-circle':
				tag = <Progress.Circle progress={value} color={theme.color.primaryColor} formatText={() => {return this.state.value * 100 + '%'}} showsText={true} width={this.state.style.width || 280} />
				break
            default: 
				tag = <Progress.Bar progress={value} width={this.state.style.width || 50} color={theme.color.primaryColor}/>
				break
        }  
		return tag
	}
}

 
export default FdProgress