import React from 'react';
import {View, Text} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from '../modules/scrolltab'
import theme from '../config/theme'

class Segment extends React.Component {
    
    constructor (props) {
        super (props) 
        this._setMap(props.columns || [])
        let activity = props.activity || props.columns[0].prop

        this.state = { 
            columns: props.columns || [],
            activity: activity,
            index: this.indexMap[activity]
        }
 
        this._press = this._press.bind(this)
    }
    _setMap = (columns) => { 
        this.indexMap = {}
        this.propMap = {}

        columns.map((column, index) => {
            this.indexMap[index + ''] = column.prop
            this.propMap[column.prop] = index 
        }) 
    } 
    _press (index) { 
        this.setState({
            activity: this.indexMap[index],
            index: index
        }, () => {
            this.props.click && this.props.click(this.indexMap[index])  
        })
    }
    componentWillReceiveProps(nextProps) {   
        this.setState({
            columns:nextProps.columns,
            activity: nextProps.activity, 
            index: this.propMap[nextProps.activity], 
        })  
    }
    
    render() { 
        return ( 
            <ScrollableTabView page={this.state.index} onChangeTab={(obj) => {this._press(obj.i)}} style={{flex: 1, backgroundColor: theme.color.backgroundColor}}  tabBarUnderlineStyle={{height: 2, backgroundColor: theme.color.primaryColor}} tabBarActiveTextColor={theme.color.primaryColor} renderTabBar={() => {
                    return this.state.columns.length <= 5 ? <DefaultTabBar style={{backgroundColor: 'white'}} /> : <ScrollableTabBar/>
                }}>  
                { 
                    this.state.columns.map((item, i) => {
                        return <View key={i} tabLabel={item.value || item.label}  style={{flex: 1}}>
                            {item.view}
                        </View>
                    })
                } 
            </ScrollableTabView>  
        )
    }
}

export default Segment