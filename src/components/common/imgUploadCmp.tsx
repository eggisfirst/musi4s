
import React, {Component} from 'react';
import { 
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity
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
          <ImageBackground
            style={styleSheet.addBox}
            source={require("../../images/work/starCheck/addImg.png")}>
            <TouchableOpacity
              onPress={this.upload}
              style={styleSheet.addBtn}
            ></TouchableOpacity>
          </ImageBackground>
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
  addBox: {
    width: pxToDp(200),
    height: pxToDp(200),
  },
  addImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    width: pxToDp(200),
    height: pxToDp(200),
  }
})
