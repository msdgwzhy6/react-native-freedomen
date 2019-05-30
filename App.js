/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Freedomen from './freedomen' 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        t1: '1rewrewrewr', tc: '5', t2: '1'
      }
    }
  }
  _D = () => {
    Freedomen.redux({
      user:(user) => {return {t1: `我变了哦${user.t1}`} } 
    })
  }
  _D2 = () => {
    Freedomen.redux({
      user: {t1: `我回来了中`}
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Freedomen.Region 
          event={params => {
              if (params.type == 'press') {
                this._D()
              }
              if (params.prop == 't5') {
                this._D2()
              }
          }}
          data={this.state.data}
          columns={[
            {type: 'text', prop: 'tc', value: 'good', style: (value, data) => {return {color: data.tc != 5 ? 'green' : 'blue'}}},
            {type: 'text', prop: 't1',  value: 'good', style: (value, data) => {return {color: data.t1 !== '1rewrewrewr' ? 'green' : 'blue'}}},
            {type: 'image', prop: 't2',  filter: value => {return {'1': require('./assets/tu.png'), '2': require('./assets/tu2.png')}}, style: {width:120, height: 120}},
            {type: 'breadcrumb', prop: 't3', options: ['ksksk', 'mmmmm']},
            {type: 'counter', prop: 't4', value: 98, max: 60, style: {borderColor:　'blue'}}, 
            {type: 'input-password',  prop: 'p1', value: '', placeholder: '输入密码'}, 
            {type: 'input-password',  prop: 'p2', value: '', placeholder: '再次输入', style: (value, data) => { 
                if (value != data.p1)
                  return {borderColor: 'red', borderWidth: 1}
                else return {}
            }}, 
            {type: 'input',  prop: 't5', value: '', placeholder: 'nizaishenmz', style: value => {return value == 'abc' ? {borderColor: 'red', borderWidth: 4} : {borderColor: '#ccc', borderWidth: 1}}}, 
            {type: 'images',  prop: 'images', value: [require('./assets/tu.png'), require('./assets/tu2.png')], style:{marginLR: 4, borderRadius: 48}}, 
          ]}
          redux={'user'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
