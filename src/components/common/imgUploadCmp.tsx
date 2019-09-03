
import React, {Component} from 'react';
import { 
  Text,
  StyleSheet,
  View,
} from "react-native"; 
import pxToDp from '../../utils/fixcss';

interface IState {
  imageList: object[]
}

interface IProps {
  // onClick:() => void
}

export default class ImgUploadCmp extends Component<IProps, IState> {

  state: IState = {
    imageList: [{},{},{},{},{},]
  }

  upload = () => {
    console.log('uploadImg')
  }

  render() {
    const imgBoxList = this.state.imageList.map((item, index) => {
      return <View
              style={[styleSheet.imgBox, {marginRight: index === 2 ? pxToDp(0) : pxToDp(20)}]}
              key={`imgBoxList${index}`}
            ></View>
    })
    return(
      <View style={styleSheet.imgUploadWrapper}>
        <View style={styleSheet.imgUploadWrapper}>
            {imgBoxList}
            <View style={[styleSheet.imgBox,styleSheet.addImg]}><Text>+</Text></View>
          </View>
      </View>
    )
  }
}
const styleSheet = StyleSheet.create({
  imgUploadWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    width: pxToDp(640),
    marginTop: pxToDp(100),
    paddingBottom: pxToDp(14),
  },
  imgBox: {
    width: pxToDp(200),
    height: pxToDp(200),
    marginBottom: pxToDp(20),
    backgroundColor: '#333',
  },
  addImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
