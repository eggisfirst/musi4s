
import React, {Component} from 'react';
import { 
  Text,
  Alert,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native"; 
import pxToDp from '../../utils/fixcss';
import ImagePicker from 'react-native-image-picker';
import { IndexModel } from "../../request";
const indexModel = new IndexModel()

interface IState {
  imageList: object[]
  avatarSource: object
}

interface IProps {
  getImageList:(obj:object) => void
}

export default class ImgUploadCmp extends Component<IProps, IState> {

  state: IState = {
    imageList: [],
    avatarSource: {uri: '../../images/work/starCheck/addImg.png'}
  }

  _imgDataList: object[] = []

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
    if (this.state.imageList.length >= 5) {
      Alert.alert(
        '提示',
        '上传图片不能超过5张！',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '好的', onPress: () => console.log('onPress OK')},
        ],
        { cancelable: false }
      )
    } else {
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
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          let temp = this.state.imageList
          temp.push(source)
          this._imgDataList.push(response)
          this.props.getImageList(this._imgDataList)
          // this.saveImage(response)
          this.setState({
            imageList: temp,
          })
        }
      });
    }
  }

  /**
   * @param {*上传的文件} formData
   */
  saveImage = (response:any) => {
    let file = {
      uri: response.uri,
      type: 'multipart/form-data',
      name: 'image.jpg'
    }
    let formData = new FormData()
    formData.append("multipartFile", file)
    console.log(formData)
    // indexModel.uploadFile(formData).then(res => {
    //   console.log('图片上传成功：', res)
    // })
  }

  render() {
    const imgBoxList = this.state.imageList.map((item: any, index) => {
      return <View
              style={[styleSheet.imgBox, {marginRight: index === 2 ? pxToDp(0) : pxToDp(20)}]}
              key={`imgBoxList${index}`}
            >
              <TouchableOpacity
                style={styleSheet.closeBtn}
              ></TouchableOpacity>
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
  closeBtn:{
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    width: pxToDp(30),
    height: pxToDp(30),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: pxToDp(15),
  },
  imgBox: {
    width: pxToDp(200),
    height: pxToDp(200),
    marginBottom: pxToDp(20),
    position: 'relative',
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
