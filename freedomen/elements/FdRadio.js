import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback
} from 'react-native';

class RadioButton extends Component {
	static defaultProps = {
		value: 0,
		checked: false,
		activeColor: '#5A8AF6',
		label: ''
	}

	constructor(props) {
		super(props);

		this.state = {
			checked: props.checked
		};

		this._onPress = this._onPress.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			checked: nextProps.checked
		})
	}

	_onPress() {
		this.props.onPress && this.props.onPress(this.props.value);
	}

	_renderItem() {
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={[styles.outer_circle, this.state.checked && styles.outer_circle_on]}>
					{
						this.state.checked ?
						<View style={styles.inner_circle}/>
						: null
					}
				</View>
				<Text style={styles.label}>{this.props.label}</Text>
			</View>
		)
	}

	render() {
		if (this.props.onPress) {
			return (
				<TouchableWithoutFeedback onPress={this._onPress}>
					{this._renderItem()}
				</TouchableWithoutFeedback>
			);
		}
		
		return this._renderItem();
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	outer_circle: {
		height: 18,
		width: 18,
		borderRadius: 9,
		borderWidth: 1,
		borderColor: '#5A8AF6',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	outer_circle_on: {
		borderColor: '#5A8AF6'
	},
	inner_circle: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: '#5A8AF6',
	},
	label: {
		color: '#5A8AF6'
	}
});

export default RadioButton;