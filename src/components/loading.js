import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Animated, Easing, Dimensions, findNodeHandl,ActivityIndicator } from 'react-native';

let width = Dimensions.get('window').width;//获取设备的宽高
let height = Dimensions.get('window').height;

import {connect} from 'react-redux';
import * as actions from '../store/actions/global/loading';
import pxToDp from '../utils/fixcss';


class Loader extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            rotateValue1: new Animated.Value(0),
            rotateValue2: new Animated.Value(0),
            rotateValue3: new Animated.Value(0),
            rotateValue4: new Animated.Value(0),
            rotateValue5: new Animated.Value(0),
            rotateValue6: new Animated.Value(0),
            rotateValue7: new Animated.Value(0),
            rotateValue8: new Animated.Value(0),
            fadeAnim1: new Animated.Value(1),
            fadeAnim2: new Animated.Value(1),
            fadeAnim3: new Animated.Value(1),
            fadeAnim4: new Animated.Value(1),
            fadeAnim5: new Animated.Value(1),
            fadeAnim6: new Animated.Value(1),
            fadeAnim7: new Animated.Value(1),
            fadeAnim8: new Animated.Value(1),
            viewRef: null
        }
    }
    componentDidMount() {
        // this.startAnimation();
    }

    startAnimation() {
        this.state.rotateValue1.setValue(0);
        this.state.rotateValue2.setValue(0);
        this.state.rotateValue3.setValue(0);
        this.state.rotateValue4.setValue(0);
        this.state.rotateValue5.setValue(0);
        this.state.rotateValue6.setValue(0);
        this.state.rotateValue7.setValue(0);
        this.state.rotateValue8.setValue(0);
        this.state.fadeAnim1.setValue(1);
        this.state.fadeAnim2.setValue(1);
        this.state.fadeAnim3.setValue(1);
        this.state.fadeAnim4.setValue(1);
        this.state.fadeAnim5.setValue(1);
        this.state.fadeAnim6.setValue(1);
        this.state.fadeAnim7.setValue(1);
        this.state.fadeAnim8.setValue(1);
        let rotateValue = [
            { rotate: this.state.rotateValue1, fade: this.state.fadeAnim1 },
            { rotate: this.state.rotateValue2, fade: this.state.fadeAnim2 },
            { rotate: this.state.rotateValue3, fade: this.state.fadeAnim3 },
            { rotate: this.state.rotateValue4, fade: this.state.fadeAnim4 },
            { rotate: this.state.rotateValue5, fade: this.state.fadeAnim5 },
            { rotate: this.state.rotateValue6, fade: this.state.fadeAnim6 },
            { rotate: this.state.rotateValue7, fade: this.state.fadeAnim7 },
            { rotate: this.state.rotateValue8, fade: this.state.fadeAnim8 },
        ];
        let times = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
        let ratateValues = rotateValue.map(
            (item, i) => Animated.timing(item.rotate, {
                toValue: 1,
                duration: times[i],
                easing: Easing.in(Easing.quad),
            })
        );
        let fadeAnims = rotateValue.map(
            (item, i) => Animated.timing(item.fade, {
                toValue: 0,
                duration: times[i],
                easing: Easing.in(Easing.quad),
            })
        );
        let parallelArr = fadeAnims.concat(ratateValues);
        Animated.parallel(parallelArr).start(() => {
            setTimeout(() => this.startAnimation(), 500)
        });
    }

    imageLoaded() {
        console.log(findNodeHandle(this.backgroundImage))
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    showComponents() {
        let Components = [
            { rotate: this.state.rotateValue1, fade: this.state.fadeAnim1 },
            { rotate: this.state.rotateValue2, fade: this.state.fadeAnim2 },
            { rotate: this.state.rotateValue3, fade: this.state.fadeAnim3 },
            { rotate: this.state.rotateValue4, fade: this.state.fadeAnim4 },
            { rotate: this.state.rotateValue5, fade: this.state.fadeAnim5 },
            { rotate: this.state.rotateValue6, fade: this.state.fadeAnim6 },
            { rotate: this.state.rotateValue7, fade: this.state.fadeAnim7 },
            { rotate: this.state.rotateValue8, fade: this.state.fadeAnim8 },
        ];
        return Components.map((item, i) => (
            <Animated.View
                key={i}
                style={{
                    width: 40,
                    height: 40,
                    top: '50%',
                    left: '50%',
                    marginTop: -40,
                    marginLeft: -25,
                    position: 'absolute',
                    marginBottom: 20,
                    opacity: item.fade,
                    transform: [
                        {
                            rotateZ: item.rotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['-220deg', '180deg']
                            })
                        }
                    ]
                }}>
                <View style={styles.dot} />
            </Animated.View>
        ))
    }
    render() {
        return (
            <Modal
                visible={this.props.Loading.status}
                animationType="fade"
                transparent={true}
            // onRequestClose={() => console.log('onRequestClose...')}
            >
                <View style={styles.container}>
                    <View style={styles.box}>
                        <ActivityIndicator size= 'large' color="#fff"/>
                        <Text style={styles.loaderText}>正在加载...</Text>
                    </View>
                    
                    {/* <Animated.View style={styles.loader} >
                        {this.showComponents()}
                        <Text style={styles.loaderText}>loading...</Text>
                    </Animated.View> */}
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