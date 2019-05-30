 
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import GroupButton from './GroupButton'

const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}; 


class FdPickerImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item
        }

        this._show = this._show.bind(this) 
    }
    _fresh (data) { 
    }
    _change () {
        return this.state.value
    } 
    _show() {
        
        ImagePicker.showImagePicker(photoOptions, (response) => { 
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {  
                let params = this.state.item
                params.value = 'data:image/jpeg;base64,' + response.data
                let upload = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }
                let formData = new FormData()
                formData.append('file', upload)
                params.upload = formData 
                this.props.event && this.props.event(params)
            }
        }); 
    }
    render () {
        return (<GroupButton event={(params) => {this._show()}} item={this.state.item.item} />)
    }
}
 
export default FdPickerImage 