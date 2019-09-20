import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Animated, Easing, Dimensions, findNodeHandl,ActivityIndicator } from 'react-native';

let width = Dimensions.get("screen").width;//获取设备的宽高
let height = Dimensions.get("screen").height;

import {connect} from 'react-redux';
import * as actions from '../store/actions/global/loading';
import pxToDp from '../utils/fixcss';


class Loader extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Modal
                visible={this.props.Loading.status}
                transparent={true}
            >
                <View style={styles.container}>
                    <View style={styles.box}>
                        <ActivityIndicator size= 'large' color="#fff"/>
                        <Text style={styles.loaderText}>正在加载...</Text>
                    </View>
                </View>
            </Modal>

        );
    }

}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, actions)(Loader)

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.2)',
    },
    box: {
        width: pxToDp(200),
        height:  pxToDp(200),
        borderRadius: pxToDp(12),
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    dot: {
        width: 6,
        height: 6,
        position: 'absolute',
        top: 0,
        left: 24,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    loaderText: {
        color: '#FFF',
        fontSize: pxToDp(24),
        marginTop:pxToDp(20)
    }
});