
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react'
import pxToDp from '../../utils/fixcss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/filter/rightFliter';
import { StarCheckTypes } from '../../utils/enum';



class FilterIcon extends React.Component<any> {
  handleClick = () => {
    const isActive = this.props.isActive
    this.props.handleFilterActive(!isActive)
  }
  render() {
    return (
      <TouchableOpacity style={styles.container}
        onPress={() => {this.handleClick()}}>
        <Text style={styles.line}>|</Text>
        <Text style={styles.textStyle}>筛选</Text>
        <Image style={styles.image} source={require("../../images/filter/filter.png")} />
    </TouchableOpacity>
    )
  }
}
const mapStateToProps = (state: { rightFilter: any; }) => state.rightFilter;

export default connect(mapStateToProps, actions)(FilterIcon)

const styles = StyleSheet.create({
  container:{
    marginRight: pxToDp(32),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  line: {
    color: "#999",
    marginRight: pxToDp(32),
    paddingLeft:pxToDp(20)
  },
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30)
  },
  image: {
    width: pxToDp(18),
    height: pxToDp(18),
    marginLeft: pxToDp(12)
  }
})