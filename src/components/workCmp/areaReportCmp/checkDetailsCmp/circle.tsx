import React from "react";

import { View, StyleSheet, Text } from "react-native";
import Svg,{
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface IProps {
  score: number
}


export const CircleProgress:React.FC<IProps> = (props) => {

  
  /**空白段 固定*半径 */
  const dasharray:any = [Math.PI * 2 * 50];
  /**分10份 每一份的大小 */
  const everyNum = (dasharray - 60)/100
  /**求传过来的数值为多少份 */
  const targetNum = props.score

  let colorBegin = props.score >= 60 ? '#0055E3' : '#FF6F5D'
  let colorStop = props.score >= 60 ? '#0FACF5' : '#FFB90A'

  return(
    <Svg
      height="120"
      width="120"
      style={styles.svg}>
      <Defs>
          <LinearGradient id="grad" >
              <Stop offset="0" stopColor={colorBegin} stopOpacity="1" />
              <Stop offset="1" stopColor={colorStop} stopOpacity="1" />
          </LinearGradient>
      </Defs>
      <Circle
        cx="60"
        cy="60"
        r="50"
        stroke="#dbdbdb"
        strokeWidth="10"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={dasharray} 
        strokeDashoffset={60}
      />

      <Circle
        cx="60"
        cy="60"
        r="50"
        stroke="url(#grad)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={dasharray} 
        strokeDashoffset={dasharray - everyNum*targetNum}
      />
    </Svg>
   
  )
}


const styles = StyleSheet.create({
  svg: {
    transform: [{rotate:'124deg'}],
  },
})