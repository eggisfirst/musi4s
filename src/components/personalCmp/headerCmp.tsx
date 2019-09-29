import React  from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import pxToDp from '../../utils/fixcss';

interface IProps {
  userInfo: any
}

export const HeaderCmp:React.FC<IProps> = (props) => {
  return(
    <ImageBackground  style={styles.container}
                      source={require("../../images/personal/bannerbg.png")}>
                      <View style={styles.cardWrapper}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardtextStyle}>慕思寝室用品有限公司</Text>
                        </View>
                        <View style={styles.cardContent}>
                          <Image  style={styles.people}
                                  source={require("../../images/personal/via.png")} />
                          <View style={styles.textContent}>
                            <Text style={styles.name}>{props.userInfo.username}</Text>
                            {/* <Text style={styles.normalText}>运营专员</Text> */}
                            <Text style={styles.normalText}>{props.userInfo.deptName}</Text>
                            {/* <Text style={styles.normalText}>移动营销组</Text> */}
                          </View>
                          <Image  style={styles.logo}
                                  source={require("../../images/personal/logo.png")}/>
                        </View>
                      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width:pxToDp(750),
    height:pxToDp(408),
    paddingTop:pxToDp(96),
    paddingLeft:pxToDp(32),
    paddingRight:pxToDp(32),
  },
  cardWrapper:{
    backgroundColor:"#fff",
    width:pxToDp(686),
    height:pxToDp(290),
    borderRadius:pxToDp(20),
  },
  cardHeader: {
    backgroundColor:"linear-gradient(-90deg,rgba(82,88,106,1),rgba(49,53,66,1))",
    width:"100%",
    height:pxToDp(80),
    borderTopLeftRadius:pxToDp(20),
    borderTopRightRadius:pxToDp(20)
  },
  cardtextStyle: {
    color:"#E8D3A8",
    fontWeight:'500',
    fontSize:pxToDp(30),
    lineHeight:pxToDp(80),
    paddingLeft:pxToDp(20)
  },
  cardContent: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:pxToDp(30),
    paddingRight:pxToDp(30),
    height:pxToDp(210),
  },
  people: {
    width: pxToDp(102),
    height: pxToDp(101),
   
  },
  textContent: {
    display:"flex",
    flexDirection:"row",
    width:pxToDp(320),
    flexWrap:"wrap",
    alignItems:"center",
  },
  name: {
    color:"#363636",
    fontSize:pxToDp(36),
    marginRight:pxToDp(70),
    lineHeight:pxToDp(70)
  },
  normalText: {
    color: "#909090",
    fontSize:pxToDp(24),
    marginRight:pxToDp(30),
    lineHeight:pxToDp(40)
  },
  logo: {
    width: pxToDp(130),
    height: pxToDp(150)
  }
    
})