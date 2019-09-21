
import React, { Component } from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import pxToDp from '../../utils/fixcss';
import ImagePicker from 'react-native-image-picker';
import { IndexModel } from "../../request";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const indexModel = new IndexModel()

interface IState {
  // imageList: string[]
  avatarSource: object
}

interface IProps {
  getImageList: (obj: object) => void
  imageList: string[]
  openBigImageBox: () => void
  changeBigImage: (str: string) => void
}

export default class ImgUploadCmp extends Component<IProps, IState> {

  state: IState = {
    // imageList: [],
    avatarSource: { uri: '../../images/work/starCheck/addImg.png' },
  }

  _imgDataList: object[] = []

  options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.9,
    maxWidth: 500,
    maxHeight: 500,
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
          { text: '好的', onPress: () => console.log('onPress OK') },
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
          this.saveImage(response, 'image')
        }
      });
    }
  }

  /**上传视频 */
  uploadVideo = () => {
    const options = {
      title: '选择视频',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '录制视频',
      chooseFromLibraryButtonTitle: '选择视频',
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 10,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.saveImage(response, 'video')
      }
    });
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
        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: '确定', onPress: () => this.sureCutImg(index) },
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
  saveImage = (response: any, type: string) => {
    let file;
    if (type === 'video') {
      file = { uri: response.uri, type: 'multipart/form-data', name: 'video.mp4' }
    } else {
      file = { uri: response.uri, type: 'multipart/form-data', name: 'image.jpg' }

    }
    let formData = new FormData()
    // formData.append('dataFile', file)
    formData.append('multipartFile', file)
    indexModel.uploadFile(formData).then(res => {
      let temp = this.props.imageList
      temp.push(res.data)
      this._imgDataList.push(res.data)
      this.props.getImageList(this._imgDataList)
    })
  }

  watchBigImage = (index: number) => {
    this.props.changeBigImage(this.props.imageList[index])
    this.props.openBigImageBox()
  }

  componentWillReceiveProps() {
    console.log('图片：', this.props.imageList)
  }

  render() {
    const imgBoxList = this.props.imageList.map((item: string, index) => {
      console.log(123, item)
      return <View
        style={[styleSheet.imgBox, { marginRight: index === 2 ? pxToDp(0) : pxToDp(20) }]}
        key={`imgBoxList${index}`}
      >
        <TouchableOpacity
          onPress={() => this.cutImg(index)}
          style={styleSheet.closeBtn}
        >
          <Image source={require('../../images/work/starCheck/cutImg.png')} style={styleSheet.cutImg} />
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => this.watchBigImage(index)}
        >
          <Image source={{ uri: item }} style={styleSheet.img} />
        </TouchableWithoutFeedback>
      </View>
    })
    return (
      <View style={styleSheet.imgUploadWrapper}>
        <View style={styleSheet.imgUploadWrapper}>
          {this.props.imageList.length && imgBoxList}
          {/* <Image source={this.state.avatarSource} style={{width: 200,height: 200}} /> */}
          <ImageBackground
            style={styleSheet.addBox}
            source={require("../../images/work/starCheck/addImg.png")}>
            <TouchableOpacity
              onPress={this.upload}
              style={styleSheet.addBtn}
            ></TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            style={styleSheet.addBox}
            source={require("../../images/work/starCheck/addImg.png")}>
            <TouchableOpacity
              onPress={() => { this.uploadVideo() }}
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
  closeBtn: {
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
