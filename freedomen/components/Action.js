import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import ActionSheet from '../modules/actionsheet'
import Region from './Region'
class Column extends Component { 

    constructor (props) {
        super (props)
 
        this.state = { 
            data: props.data || {},
            options: this._resetColumns(props.columns)
        } 
    }
    _resetColumns = (columns) => {
        let options = []
        columns.map((el, index) => {
            options.push(<Region 
                columns={[el]}
            />)
        })
        options.push('取消')
        return options
    }
    _event = (index) => { 
        this.props.event && this.props.event(this.props.columns[index] || {})
    }  
    show = () => {
        this.ActionSheet.show()
    }
    render () {
        return <ActionSheet
          ref={o => this.ActionSheet = o} 
          options={this.state.options}
          cancelButtonIndex={this.state.options.length - 1}
          destructiveButtonIndex={1}
          onPress={this._event}
        />
    }
}

export default Column