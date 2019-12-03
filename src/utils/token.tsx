import { Alert } from "react-native"
import {_removeItem} from './utils'

const setPage = (err: any, that: any) => {
  if (err.message === 'Request failed with status code 510') {
    Alert.alert('提示', '登录已失效，请重新登录',
      [{
        text: '确定',
        onPress: () => {
          _removeItem('token')
          that.props.navigation.navigate('Login')
        }
      }])
  }
}

export {setPage}