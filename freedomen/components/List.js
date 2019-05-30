import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, RefreshControl, Platform } from 'react-native'
import Region from './Region'
 
class FreshList extends Component {   
    config = {
        pageNo: 1,
        pageSize: 15
    }

    constructor (props) {  
        super (props)

        this.config = props.config || this.config
        this.tempProps = props

        this.state = { 
            columns: props.columns,
            data: props.data || [], 

            noMore: true,
            animating: true,
            freshing: false,
            paging: false,
            once: true,
            pageNo: this.config.pageNo, 
        } 
        this._fresh = this._fresh.bind(this)
        this._page = this._page.bind(this)
        this._event = this._event.bind(this) 
        this._footer = this._footer.bind(this)
    } 
    componentDidMount() {}

    componentWillReceiveProps(nextProps) {   
        if (this.state.paging) {  
            this.setState({
                paging: false,
                data: this.state.data.concat(nextProps.data), 
                noMore: nextProps.data < this.config.pageSize
            })
        } else if (this.state.freshing) {  
            this.setState({
                data: nextProps.data == -1 ? [] : nextProps.data, 
                freshing: false,  
                noMore: nextProps.data == -1 ? true : (nextProps.data || []).length < this.config.pageSize
            }) 
        }  else if (nextProps.data != -1) { 
            this.setState({ 
                data: nextProps.data,  
                animating: (nextProps.data || []).length == 0,
                noMore: (nextProps.data || []).length < this.config.pageSize
            })
        }  else if (nextProps.data == -1) {
            this.setState({ 
                data: [], 
                animating: false,
                noMore: true
            })
        }
    }
    _fresh() { 
        if (this.state.lock || this.state.freshing) {
            return
        }  
        this.setState({freshing: true, noMore: true, pageNo: this.config.pageNo }, () => {
            this._event({ prop: '$fresh', event: '$fresh', row: { pageNo: this.config.pageNo}})
        })
    }
    _event(params) { 
        if (!this.state.lock)
            this.props.event && this.props.event(params)
    }
    _page() {     
        if (this.state.lock || this.state.noMore || this.state.paging)
            return  
            
        this.setState({paging: true, pageNo: this.state.pageNo + 1} , () => {
            this._event({ prop: '$page', event: '$page', row: { pageNo: this.state.pageNo } }) 
        })
    }
    _footer() {
        return (
            <View style={{alignItems: 'center', margin: 5}}> 
                {
                    this.state.noMore 
                    ? this.state.data.length === 0 ? null : <Text style={{color: "#C0C4CC"}}>已加载全部</Text> 
                    : 
                    <View style={{flexDirection: 'row'}}>
                        <ActivityIndicator
                        animating={true} 
                        size="small" />
                        <Text style={{color: "#C0C4CC"}}>正在加载...</Text>
                    </View>
                }
                
            </View>
        )
    }
    render () {
        const ts = Platform.OS === 'android' ? 0.5 : 0;
        let { columns, data } = this.state
        if (!data || data == -1) 
            return this.props.onNull || null 
        if(data.length == 0)
            return this.props.onNull || null
        data.map((d, i) => {
            d.key = i + ''
        })  
        console.warn(data)
        return  (
            this.state.animating 
            ? 
                <ActivityIndicator
                animating={this.state.animating} 
                size="large" />
            :
                <FlatList  
                    data={this.state.data}   
                    refreshControl = {<RefreshControl refreshing={this.state.freshing} onRefresh={this._fresh} ></RefreshControl>}
                    onEndReached={this._page.bind(this)}
                    onEndReachedThreshold={ts}
                    renderItem={({item}) => <Region data = {item} columns={columns} event={this._event} />}
                    ListFooterComponent={this._footer}
                /> 
        )
    }
}

export default FreshList