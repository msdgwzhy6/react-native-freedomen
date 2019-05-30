import React from 'react';
import {View, Text,StatusBar,ScrollView} from 'react-native'  
import Components from '../../freedomen/components'
class Index extends React.Component {  
    constructor (props) {
        super (props) 
        this.state = {
            params : props.navigation.state.params,
            
        }
    }
    async componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        
    } 

    render() {
        return (
            <View style={{flex: 1}}>
                <Components.Region columns={[
                    [
                        {type: 'button-image', prop: 'back', value: require('../../assets/back.png'), style: {height: 25, width: 26, resizeMode: 'stretch'}},
                        {type: 'text-h1', prop: 'knifeName', style: {flex: 1, alignItems: 'center', marginRight: 13}},  
                        {type: 'br', style: {flexDirection: 'row', height: 48, alignItems: 'center',paddingLeft: 8, paddingRight: 8 ,borderBottomColor: '#ccc', borderBottomWidth: 0.5}}
                    ],
                    [
                        {type: 'image', prop: 'knifeImage', style: {height: 145, width: 145, resizeMode: 'stretch'}},
                        [
                            {type: 'text-h2', prop: 'knifeName'},
                            {type: 'text-h3', prop: 'knifePosition'},
                            {type: 'text-h2', prop: 'knifePrice'},
                            [
                                {type: 'text-h2', prop: 'knifeTotal', style: {flex: 1}},
                                {type: 'counter', value: 0, prop: 'counter'},
                                {type: 'br', style: {flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}
                            ],
                            {type: 'button-primary', value:'加入购物车', prop: 'add', style: {width: 138, borderRadius: 3}}
                        ],
                        {type: 'br', style: {flexDirection: 'row', paddingTop: 20}}
                    ],
                    {type: 'br', style: {backgroundColor: "white", paddingBottom: 20}}
                ]} data={this.state.params} event={(params) => {
                        if (params.prop == 'back') this.props.navigation.goBack()
                        else if (params.prop == 'add') {
                            alert(JSON.stringify(params.row))
                        }
                    }
                }/>
                
            </View>
        )
    }
}

export default Index