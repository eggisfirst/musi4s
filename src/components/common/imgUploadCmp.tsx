
import React, {Component} from 'react';
import { 
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native"; 
import pxToDp from '../../utils/fixcss';
import ImagePicker from 'react-native-image-picker';

interface IState {
  imageList: object[]
  avatarSource: object
}

interface IProps {
  // onClick:() => void
}

export default class ImgUploadCmp extends Component<IProps, IState> {

  state: IState = {
    imageList: [],
    avatarSource: {uri: '../../images/work/starCheck/addImg.png'}
  }

  options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  upload = () => {
    ImagePicker.showImagePicker(this.options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('图片：', response.uri)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        let temp = this.state.imageList
        temp.push(source)
        // console.log('图片数组：', this.state.imageList)
        this.setState({
          imageList: temp,
        });
      }
    });
  }

  render() {
    const imgBoxList = this.state.imageList.map((item: any, index) => {
      return <View
              style={[styleSheet.imgBox, {marginRight: index === 2 ? pxToDp(0) : pxToDp(20)}]}
              key={`imgBoxList${index}`}
            >
              <Image source={item} style={{width: pxToDp(200),height: pxToDp(200)}} />
            </View>
    })
    return(
      <View style={styleSheet.imgUploadWrapper}>
        <View style={styleSheet.imgUploadWrapper}>
          {imgBoxList}
          {/* <Image source={this.state.avatarSource} style={{width: 200,height: 200}} /> */}
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
    // backgroundColor: '#333',
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
