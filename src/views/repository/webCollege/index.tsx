import React from "react";
import { View, StyleSheet, Text } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import { SearchCmp } from "../../../components/workCmp/starCheck/searchCmp";
import { SearchTypes } from "../../../utils/enum";
import ImgRowScroll from "../../../components/common/swiper/imgRowScroll";

import { IndexModel } from "../../../request";
import SwiperCmp from '../../../components/common/swiper/swiper';
const indexModel = new IndexModel()

export default class WorkScreen extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state = {
    title: '',
    categoryList: [],
    loopData: []
  }
  /**
   * 获取轮播图
   */
  getAdSwiper(classify:number) {
    indexModel.getAdSwiper(this, classify).then(res => {
      if(res.status) {
        this.setState({
          loopData: res.data
        })
      }
    })
  }

  /**
   * 获取分类
   */
  getIndexCategory(classify: number) {
    indexModel.getIndexCategory(this, classify).then(res => {
      if(res.status) {
        this.setState({
          categoryList: res.data
        })
      }
    })
  }
  /**
   * 点击分类跳转页面
   */
  handClickCategory = (index: number) => {
    console.log(111,index)
  }



  /**
   * 初始化判断是金管家还是网络商学院
   */
  init = () => {
    this.setState({
      title: this.props.navigation.state.params.title
    })
    if(this.props.navigation.state.params.title === SearchTypes.webSxy) {
      this.getIndexCategory(2)
      this.getAdSwiper(2)
    }
    else {
      this.getIndexCategory(1)
      this.getAdSwiper(1)
    }
  }
  componentDidMount() {
    this.init()
  }
  eggHandleSearch = (type: SearchTypes) => {
    this.props.navigation.push('SearchPage', {
      type,
    })
  }

  render() {
    const data = [
      
    ]
    const type = this.state.title === SearchTypes.webSxy? SearchTypes.webSxy : SearchTypes.goldGj
    return (
      <View style={styles.wrapper}>
        <HeaderCmp title={this.state.title}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <View style={styles.content}>
          <SearchCmp eggHandleSearch={this.eggHandleSearch}
            type={type}
            searchWidth={686}
            searchText={'请输入搜索内容'}
          />
        </View>
        <View style={styles.swiper}>
          {
            this.state.loopData.length? 
            <SwiperCmp loopData={this.state.loopData}/> : null
          }
        </View>
        <ImgRowScroll data={this.state.categoryList} handClick={this.handClickCategory}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: pxToDp(32),
  },
  swiper: {
    width: "100%",
    height: pxToDp(354),
    marginTop: pxToDp(15),
    marginBottom: pxToDp(30)
  }
})
