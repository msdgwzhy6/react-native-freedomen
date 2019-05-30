import React, { Component } from 'react';
import {View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import Elements from '../elements' 
import Swipeout from 'react-native-swipeout'
import Scroll from './Scroll'
// import Collapsible from  './Collapsible'
import Views from './Views'
const dimensions = Dimensions.get('window')
import util from '../utils/util'    
const percentNum = [
    'height',
    'width', 
]
/**
 * items: [id]prop, value, [f]event, [f]load
 * 
 */
class Region extends Component {
    //全局状态管理
    static redux = (obj) => { 
        Object.keys(obj).forEach((key) => {
            if (Region.reduxMap[key] !== void 0) { 
                let newData = {}
                if (typeof obj[key] == 'function') {
                    newData = obj[key](Region.reduxMap[key].data) 
                } else {
                    newData = obj[key] 
                }
                
                // newData = util.setAttribute(newData, Region.reduxMap[key].data)

                let currentComponent = Region.reduxMap[key]._this

                let columns = currentComponent._resetColumns(currentComponent.state.columns, newData) 
                currentComponent.setState({
                    data: newData,
                    columns: columns
                })
            }
            
        });
    }
    //状态存储表
    static reduxMap = {} 
     
    constructor(props) {
        super(props)  

        this.state = { 
            data: props.data || {},
            columns: this._resetColumns(props.columns, props.data),
            style: util.resetStyle(props.style) 
        } 
        this.inputs = []

        //内置redux
        if (props.redux) {  
            if (Region.reduxMap[props.redux])
                console.warn('the key ' + props.redux + 'already exists')

            Region.reduxMap[props.redux] = {
                _this: this,
                data: this.state.data
            }
        }
    } 
    
    componentWillUnmount() {
        //清除没有用的redux
        if (this.props.redux) { 
            delete Region.reduxMap[this.props.redux]
        }
    }
    
    componentWillReceiveProps(nextProps) {   

        let data = this.state.data

        for (let i in nextProps.data) {
            data[i] = nextProps.data[i]
        }

        let columns = this._resetColumns(this.state.columns,  data)  

        this.setState({
            columns: columns,
            data: data
        })

        //on input change 
        if (this.inputs.length) { 
            for (let ref of this.inputs) { 
                this.refs[ref] && this.refs[ref]._fresh(data[ref])
            }
        }
    } 

    _resetColumns = (columns = [], data = {}) => {

        for (let i = 0; i < columns.length; i ++) { 

            if (Array.isArray(columns[i])) {
                this._resetColumns(columns[i], data)
            } else { 
                columns[i].value = data[columns[i].prop] === void 0 ? columns[i].value : data[columns[i].prop] //reset item value
                columns[i].$data = data  //into full data

                if (columns[i].style && typeof columns[i].style !== 'function') {
                    columns[i].style = util.resetStyle(columns[i].style)
                }
            } 
        } 

        return columns
    } 

    _buttons = (options) => {
        if (!options) {
            return [{
                text: '删除',
                backgroundColor: 'red',
                onPress: () => {
                    this._event({
                        prop: '$delete', 
                        type: 'press'
                    })
                },
            }]
        } else {
            return options.map(option => {
                return {
                    text: option.value,
                    backgroundColor: option.backgroundColor || 'red',
                    onPress: () => {
                        this._event({
                            prop:  option.prop, 
                            type: 'press'
                        })
                    },
                }
            })
        }
    }

    _tag = (el, index) => {

        let tag    

        switch (el.type) {
            case 'input':
            case 'input-password': 
                tag = <Elements.FdInput ref={el.prop} change={this._change} item={el}/>
                this.inputs.push(el.prop)
                break
            // case 'input-area':
            //     tag = <Elements.FdInputArea change={this._change} item={el}/>
            //     break
            // case 'date': 
            // case 'datetime':
            // case 'time':
            //     tag = <Elements.FdPickDate item={el} change={this._change}/> 
            //     break
            case 'counter': 
                tag = <Elements.FdCounter change={this._change} item={el}/>
                break
            case 'view':
            case 'view-x':
            case 'view-y':
                tag = <Views event={(params) => {this._event({prop:params.prop, type: params.type, value: params.row}) }} style={el.style} columns={el.columns} data={el.value} type={el.type}/>
                break
            // case 'collapsible':
            //     tag = <Collapsible event={this._event} hidden={el.hidden} visual={el.visual} data={el.value} headProp={el.headProp}/>
            //     break
            case 'scroll':
            case 'scroll-x':
            case 'scroll-y': 
                tag = <Scroll event={(params) => { this._event({value: params.row}) }} style={el.style} columns={el.columns} data={el.value} type={el.type}/>
                break
            case 'tags':
                tag = <Elements.FdTags change={this._change} item={el}/>
                break
            case 'text': 
            case 'text-h1':
            case 'text-h2':
            case 'text-h3':
                tag = <Elements.FdText  item={el}/>
                break
            case 'image': 
                tag = <Elements.FdImage item={el} />
                break
            case 'menu':
                tag = <Elements.FdMenu item={el} event={this._event}/>
                break
            case 'checkbox': 
                tag = <Elements.FdCheckBox item={el} change={this._change} />
                break
            case 'images': 
                tag = <Elements.FdImages item={el} event={this._event}/>
                break
            // case 'select-address':
            //     tag = <Elements.FdSelectAddress change={this._change} item={el} />
            //     break
            // case 'select-image':
            //     tag = <Elements.FdPickImage event={this._event} item={el} />
            //     break
            // case 'video':
            //     tag = <Elements.FdVideo item={el} />
            //     break  
            case 'switch':
                tag = <Elements.FdSwitch change={this._change} item={el} />
                break  
            case 'button-primary': 
            case 'button-disabled': 
            case 'button-cancel':  
            case 'button-text': 
            case 'button-image':
                tag =  <Elements.GroupButton event={this._event} item={el} />
                break 
            // case 'progress':
            // case 'progress-bar':
            // case 'progress-circle':
            //     tag =  <Elements.FdProgress item={el} />
            //     break
            case 'breadcrumb':
                tag = <Elements.FdBreadcrumb event={this._event} item ={el} />
                break
            default: tag = <View key={index}></View>
        }

        return (
            <View style={el.style} key={index}>
                { tag }
            </View>
        )
    }
    _change = (param) => { 

        let { data } = this.state
        data[param.prop] = param.value

        this.setState(data, () => {
            let params = {
                type: 'change',
                prop: param.prop,
                value: param.value
            }
            this._event(params)
        })
    }

    _event = (params) => {    

        params.row = this.state.data 
        this.props.event && this.props.event(params)

    }
    _makeJsx = (columns) => {

        let view = []
        let sub = [] 

        for (let i = 0; i < columns.length; i ++) { 

            if (['input', 'input-area', 'input-password'].includes(columns[i].type)) this.inputFlag = true
            //if current view need load
            if (columns[columns.length - 1].type == 'br' && typeof columns[columns.length - 1].load === 'function') {
                if (!columns[columns.length - 1].load(columns[columns.length - 1].value, this.state.data))
                    continue
            }

            if (columns[i].load && typeof columns[i].load === 'function') {
                if (!columns[i].load(columns[i].value, this.state.data))
                    continue
            }

            //br: view, click:可以点击， backimage: 背景图片， swipeout 侧滑,必要options [{prop: ,text, backgroundColor},{text}]
            if (['br', 'click', 'backimage', 'swipeout'].includes(columns[i].type)) {
                if (columns[i].type == 'br') {
                    view.push(
                        <View key={i} style={[columns[i].style]}>{ sub }</View>
                    )  
                } else if (columns[i].type == 'backimage') {
                    this.state.data[columns[i].prop] ? 
                        view.push(
                            <ImageBackground key={i} source={{uri: this.state.data[columns[i].prop]}} style={[{width: '100%', height: '100%'}, columns[i].style]}>
                                { sub } 
                            </ImageBackground>
                        )  :
                        view.push(
                            <ImageBackground key={i} source={columns[i].value} style={[{width: '100%', height: '100%'}, columns[i].style]}>
                                { sub } 
                            </ImageBackground>
                        )  
                } else if (columns[i].type == 'click') {
                    view.push( 
                        <TouchableOpacity key={i} style={util.makeStyle(columns[i].style, 'height', 'width')} onPress={() => {
                                this._event({ type: 'click', prop: columns[i].prop })
                            }}>
                            <View style={[columns[i].style]}>
                                { sub } 
                            </View>
                        </TouchableOpacity> 
                    ) 
                } else if (columns[i].type == 'swipeout') {
                    view.push(
                        <Swipeout key={i} right={this._buttons(columns[i].options)}>
                            <View style={columns[i].style}>
                                {sub}
                            </View>
                        </Swipeout>
                    )
                }
                sub = [] 

            } else if (Array.isArray(columns[i])) {

                sub.push(this._makeJsx(columns[i]))

            } else {

                sub.push(this._tag(columns[i], i))

            }
        } 
        
        if (!['br', 'click', 'backimage'].includes(columns[columns.length - 1].type))  
            view.push(
                <View key={10000} style={[{flex: 1}, this.state.style]}>
                    { sub }
                </View>
            ) 

        return view
    }
    render() {    
        return (
            <View style={this.state.style}>
                {
                    this._makeJsx(this.state.columns)
                }
            </View> 
        )
    }
} 
 
export default Region