
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

import Vedio from '../workCmp/areaReportCmp/checkDetailsCmp/swiper/vedio'

interface IState {
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
    avatarSource: { uri: '../../images/work/starCheck/addImg.png' },
  }

  options = {
    mediaType: 'mixed',
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.8,
    maxWidth: 400,
    maxHeight: 400,
    allowsEditing: true,
    noData: true,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  judegType = (url: string) => {
    console.log('url',url)
    const reg = /\.mp4$/gm
    if (reg.test(url)) {
      return 'video'
    } else {
      return 'image'
    }
  }

  hasVideo = (arr) => {
    return arr.some((item: string) => {
      return this.judegType(item) === 'video'
    })
  }

  upload = () => {
    try {
      if (this.props.imageList.length >= 5) {
        Alert.alert(
          '提示',
          '上传文件不能超过5个！',
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
    } catch (error) {
      Alert.alert(
        '报错',
        error,
        [
          { text: '好的', onPress: () => console.log('onPress OK') },
        ],
        { cancelable: false }
      )
    }
  }

  /**上传视频 */
  uploadVideo = () => {
    const options: any = {
      title: '选择视频',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '录制视频',
      chooseFromLibraryButtonTitle: '选择视频',
      mediaType: 'video',
      videoQuality: 'low',
      durationLimit: 10,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    try {
      if (this.hasVideo(this.props.imageList)) {
        Alert.alert(
          '提示',
          '上传视频不能超过1个！',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            { text: '好的', onPress: () => console.log('onPress OK') },
          ],
          { cancelable: false }
        )
      } else {
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
    } catch (error) {
      Alert.alert(
        '报错',
        error,
        [
          { text: '好的', onPress: () => console.log('onPress OK') },
        ],
        { cancelable: false }
      )
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
    console.log('file',file)
    let formData = new FormData()
    // formData.append('dataFile', file)
    formData.append('multipartFile', file)
<<<<<<< HEAD
    indexModel.uploadFile(formData).then(res => {
=======
    indexModel.uploadFile(this, formData).then(res => {
>>>>>>> newtoken
      console.log('res',res)
      let temp = this.props.imageList
      temp.push(res.data)
      this.props.getImageList(temp)
    })
  }

  watchBigImage = (index: number) => {
    this.props.changeBigImage(this.props.imageList[index])
    this.props.openBigImageBox()
  }

  render() {
    const imgBoxList = this.props.imageList.map((item: string, index) => {
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
          style={styleSheet.img}
        >
          {
            this.judegType(item) !== 'video' ?
              <Image source={{ uri: item }} style={styleSheet.img} /> :
              <Vedio videoUrl={item} /> 
          }
        </TouchableWithoutFeedback>
      </View>
    })
    return (
      <View style={styleSheet.imgUploadWrapper}>
        <View style={styleSheet.imgUploadWrapper}>
          {imgBoxList}
          {/* <Image source={this.state.avatarSource} style={{width: 200,height: 200}} /> */}
          
          {/* 添加图片按钮 */}
          {
            this.props.imageList.length < 5 ?
              <TouchableOpacity
                onPress={this.upload}
                style={styleSheet.videoBtn}
              >
                <Image style={styleSheet.videoImg} source={require('../../images/img.png')}></Image>
              </TouchableOpacity> : null
          }

          {/* 添加视频按钮 */}
          {
            this.props.imageList.length < 5 && !this.hasVideo(this.props.imageList) ?
              <TouchableOpacity
                onPress={() => { this.uploadVideo() }}
                style={styleSheet.videoBtn}
              >
                <Image style={styleSheet.videoImg} source={require('../../images/video.png')}></Image>
              </TouchableOpacity> : null
          }
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
    width: pxToDp(660),
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

  videoBtn: {
    width: pxToDp(200),
    height: pxToDp(200),
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 0.1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: pxToDp(20)
  },
  videoImg: {
    width: pxToDp(80),
    height: pxToDp(80),
  }
})
