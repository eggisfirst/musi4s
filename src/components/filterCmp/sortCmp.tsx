
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import pxToDp from '../../utils/fixcss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/filter/sort';
import { SotrList } from '../../utils/enum';

interface IProps {
  handleClickSort: () => void
  handleSortIndex?: any
  handleSortActive?: any
  sortList?: any
  isActive?: any
  activeIndex?: any
}

class Sort extends React.Component<IProps> {
  //点击头部
  handleClick = () => {
    this._setActive()
  }
  //选择
  handleSelect = (i:number) => {
    this._setActive()
    if(this.props.activeIndex === i) {
      return
    }
    this.props.handleClickSort()
    this.props.handleSortIndex(i)
  }
  _setActive = () => {
    const isActive = this.props.isActive
    this.props.handleSortActive(!isActive)
  }
  render() {
    let list = null;
      if(this.props.isActive) {
        list = (
          <>
          <View style={styles.modalStyle}>
              {
                this.props.sortList.map((item:any,i:number) => (
                  <TouchableOpacity key={item}  style={styles.listWrapper} 
                                    activeOpacity={0.8}
                                    onPress={() => {this.handleSelect(i)}} >
                                    <Text style={styles.listItem}>{item}</Text>
                                    {
                                      this.props.activeIndex === i && (
                                        <Image  style={styles.checkStyle}
                                                source={require("../../images/filter/checked.png")} />
                                      )
                                    }
                  </TouchableOpacity>
                ))
              }
          </View>
          <Text style={styles.rest}></Text>
          </>
        )
      }
    return (
      <View style={styles.container}>
      <TouchableOpacity  
        style={styles.btnStyle}
        onPress={() => {this.handleClick()}}>
        <Text style={styles.textStyle}>{this.props.sortList[this.props.activeIndex]}</Text>
        <Image  style={this.props.isActive? styles.imageStyle2 : styles.imageStyle}
                source={require('../../images/filter/down.png')} />
      </TouchableOpacity>
      {list}
    </View>
    )
  }
}

const mapStateToProps = (state: { sort: any; }) => state.sort;

export default connect(mapStateToProps, actions)(Sort)


const styles = StyleSheet.create({
  rest: {
    backgroundColor:"rgba(0,0,0,0.5)",
    width: pxToDp(750),
    height: pxToDp(2000),
    position: "absolute",
    top: pxToDp(240),
    zIndex: 9999999
  },
  container: {
    // borderBottomWidth:pxToDp(1),
    // borderColor:"#e1e1e1",
    // position:"relative",
  },
  btnStyle: {
    paddingLeft: pxToDp(32),
    display:'flex',
    flexDirection:"row",
    alignItems:"center",
    width:pxToDp(250),
    height:pxToDp(80),
    paddingRight: pxToDp(20),
  },
  imageStyle: {
    width: pxToDp(16),
    height: pxToDp(16),
    marginLeft: pxToDp(10)
  },
  imageStyle2: {
    width: pxToDp(16),
    height: pxToDp(16),
    marginLeft: pxToDp(10),
    transform: [{rotateX:'180deg'}]
  },
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
  modalStyle: {
    backgroundColor:"rgba(0,0,0,0.5)",
    // height: pxToDp(1500),
    width:pxToDp(750),
    // position: "absolute",
    // top: pxToDp(80)
    // borderTopWidth:pxToDp(1),
    // borderColor: "#e1e1e1"
  },
  listWrapper: {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    width:"100%",
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    backgroundColor:"rgba(248,248,248,1)",

  },
  listItem: {
    height: pxToDp(80),
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
  checkStyle: {
    width: pxToDp(22),
    height: pxToDp(22),
  }
})


