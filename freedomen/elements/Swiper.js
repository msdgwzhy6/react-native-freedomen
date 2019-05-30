import React from 'react'
import { Picker} from 'react-native'
import constants from '../configs/constants'
import Swiper from 'react-native-swiper'
import FdImage from './FdImage'
class FdSWiper extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, options, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value, 
            prop: item.prop,
            options: item.options || []
        }
        
        this._fresh = this._fresh.bind(this)
        this._change = this._change.bind(this)
        this._options = this._options.bind(this)
    }
    _fresh (data) {
        this.setState(data)
    }
    _change () {
        return this.state.value
    }
    _options (options) {
        return options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />
        })
    } 
    render () {
        return (
                <Swiper style={styles.wrapper} nextButton={<Text ></Text>} prevButton={<Text ></Text>}  showsButtons={true}>
                    <View style={styles.slide1}>
                        <Image source={require('../assets/p1.png')} style={{flex: 1, height: 220, width: width}} />
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>I am a monster</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>I want to bite you</Text>
                    </View>
                    {
                        (this.state.value || []).map((d, i) => {
                            return <View style={this.props.style} key={i}>
                                    <FdImage item={value}/>
                                </View>
                        })
                    }
                </Swiper>
        )
    }
}

export default FdSWiper