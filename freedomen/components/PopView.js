import React from 'react';
import {View, Text, StatusBar, ScrollView, TouchableOpacity, Dimensions} from 'react-native'  
const {width, height} = Dimensions.get('window')
import Components from '../../freedomen/components'
//position: top, bottom, left, center right[default: center]
class PopView extends React.PureComponent {  
    constructor (props) {
        super (props) 
        this.state = {
            close: true,
            style: props.style,
            columns: props.columns,
            data: props.data
        }
    }
    async componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        
    } 
    _event = (params) => {
        this.props.event && this.props.event(params)
    }
    _show = () => { 
        this.setState({
            close: false
        })
    }
    _close = () => {
        this.setState({
            close: true
        })
    }
    render() {
        return ( this.state.close ? null : <View style={{
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: 'rgba(0, 0, 0, 0.3)'
           }} >
            
            <View style={[{
                    position: 'absolute',
                    width: width,
                    height: height * 0.8,  
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    backgroundColor: 'white', 
                    bottom: 0, 
                    flex: 1 
                }, this.state.style]}> 
                <Components.Region 
                    event={this._event}
                    columns={this.state.columns}
                    data={this.state.data}
                />
            </View>
           </View>
        )
    }
}

export default PopView