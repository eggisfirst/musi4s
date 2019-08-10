import { View, StyleSheet } from "react-native";
import { MapView } from 'react-native-amap3d'
import pxToDp from "../../utils/fixcss";
import React from "react";

interface IProps {
  targerLat: number
  targetLong: number
}


export const MapCanvas:React.FC<IProps> = ({targerLat,targetLong}) => {
  return (
    <MapView  style={styles.map}  
              coordinate={{
                latitude:  targerLat,
                longitude: targetLong,
              }}
              mapType='standard'
              locationEnabled={true}
              >
      <MapView.Marker
                      draggable
                      coordinate={{
                        latitude: targerLat,
                        longitude: targetLong,
                      }}/>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: pxToDp(686),
    height: pxToDp(300),
    marginBottom: pxToDp(39)
  },
})