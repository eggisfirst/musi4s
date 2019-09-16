
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
  // imageList: string[]
  avatarSource: object
}

interface IProps {
  getImageList:(obj:object) => void
  imageList: string[]
}

export default class ImgUploadCmp extends Component<IProps, IState> {

  state: IState = {
    // imageList: [],
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
    if (this.props.imageList.length >= 5) {
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
          this.saveImage(response)
        }
      });
    }
  }

  /**
   * @param {*删除的图片下标} index
   */
  cutImg = (index: number) => {
    Alert.alert(
      '',
      '确定删除图片吗？',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确定', onPress: () => this.sureCutImg(index)},
      ],
      { cancelable: false }
    )
  }

  /**
   * 确定删除图片
   * @param {*删除的图片下标} index
   */
  sureCutImg = (index: number) => {
    let temp = this.props.imageList
    temp.splice(index, 1)
    this.props.getImageList(temp)
    // this.setState({imageList: this.props.imageList})
  }

  /**
   * @param {*上传的文件} formData
   */
  saveImage = (response:any) => {
    let file = {uri: response.uri, type: 'multipart/form-data', name: 'image.jpg'}
    let formData = new FormData()
    formData.append('multipartFile', file)
    // formData.append('dataFile', file)
    // formData.append('prefix', 'cert-check-log')
    indexModel.uploadFile(formData).then(res => {
      console.log('上传图片返回的数据:', res)
      // const source = { uri: res.url };
      let temp = this.props.imageList
      temp.push(res.data)
      this._imgDataList.push(res.data)
      console.log(555, this._imgDataList)
      this.props.getImageList(this._imgDataList)
      // this.setState({
      //   imageList: temp,
      // })
    })
  }

  componentWillReceiveProps() {
    console.log('图片：', this.props.imageList)
  }

  render() {
    const imgBoxList = this.props.imageList.map((item: string, index) => {
      console.log(123, item)
      return <View
              style={[styleSheet.imgBox, {marginRight: index === 2 ? pxToDp(0) : pxToDp(20)}]}
              key={`imgBoxList${index}`}
            >
              <TouchableOpacity
              onPress={() => this.cutImg(index)}
                style={styleSheet.closeBtn}
              >
              <Image source={require('../../images/work/starCheck/cutImg.png')} style={styleSheet.cutImg} />
              </TouchableOpacity>
              <Image source={{uri: item}} style={styleSheet.img} />
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
  cutImg: {
    width: '100%',
    height: '100%',
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
  },
  img: {
    width: pxToDp(200),
    height: pxToDp(200),
  },
})
