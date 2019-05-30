import region from '../configs/region'
import Picker from 'react-native-picker';

class FdSelect {
     constructor() {
        
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
        return (<Picker
            selectedValue={this.state.value}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({value: itemValue})}>
                {this._options(this.state.options)}
          </Picker>)
    }
}

const select = new FdSelect()
export default select 