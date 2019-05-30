import React from 'react'
import { View, TouchableOpacity } from 'react-native' 
import Icon from 'react-native-vector-icons/FontAwesome';
const icons = (params) => <Icon name={params.name} style={[{color:appConfig.mainColor},params.style]}/>
const styleItems = [
    'height',
    'width'
]

class FdRate extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = { 
            prop: item.prop,
            value: item.value, 
            size: item.size || 5, 
            space: item.space || 0,
            color: item.color || 'gold'
        } 
        this._fresh = this._fresh.bind(this)
        this._change = this._change.bind(this)
        this._style = this._style.bind(this)

        this.style = this._style(item.style)
        this._change = this._change.bind(this)
    } 
    _change (value) {
        this.setState({
            value: value
        })

        this.props.change && this.props.change({
            prop: this.state.prop,
            value: text
        })
    }
    _style (style) {
        if (!style) {
            return {}
        }
        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }

        return newStyle
    }
    render() {
        return <View>
            {this.renderEmptyStar()}
            {this.renderFullStar()}
        </View>
    }
 
    renderEmptyStar() {
        //先展现一层空的星星，这里的icons方法参考下面一段代码
        let stars = [];
        for (var i = 0; i < this.state.size; i++) {
        stars.push(
            <TouchableOpacity onPress={() => {this._change(i + 1)}}>
                <View key={"star-o-"+i}>{icons({
                    name: 'star-o',
                    style: {
                    fontSize: this.state.size,
                    color: '#aaa',
                    marginHorizontal: this.state.space,
                    width: this.size * 0.93
                    }
                })}</View>
            </TouchableOpacity>
        );
        }
        return <View style={{flexDirection:'row'}}>{stars}</View>
    }
 
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.stars !== this.props.stars) {
    //     let stars = nextProps.stars || 0;
    //     if (stars > this.stotal) {
    //         stars = this.total;
    //     }
    //     this.setState({
    //         stars: stars
    //     });
    //     }
    // }
 
    renderFullStar() {
        //按评分填充星星
        let stars = [];
        let width = Math.floor(this.state.stars) * (this.starSize * 0.93 + 2 * this.starSpacing)
        if (this.state.stars > Math.floor(this.state.stars)) {
            width += this.starSpacing;
            width += this.starSize * 0.93 * (this.state.stars - Math.floor(this.state.stars));
        }
        for (let i = 0; i < this.total; i++) {
        stars.push(<View key={"star-"+i}>{icons({
            name: 'star',
            style: {
            fontSize: this.starSize,
            color: this.starColor,
            marginHorizontal: this.starSpacing,
            width: this.starSize * 0.93
            }
        })}</View>);
        }
        return <View style={{flexDirection:'row',position:'absolute',top:0,left:0,width:width, overflow: 'hidden'}}>{stars}</View>
    }
}

export default FdRate