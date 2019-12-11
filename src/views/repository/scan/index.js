import { RNCamera } from 'react-native-camera'
import React, { Component } from 'react';
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import {
    StatusBar,
    StyleSheet,
    FlatList,
    SectionList,
    TouchableOpacity,
    Animated,
    PermissionsAndroid,
    default as Easing,
    ImageBackground,
} from 'react-native';
import { View, Text } from 'react-native';
import pxToDp from '../../../utils/fixcss';

export default class Scan extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            //中间横线动画初始值
            moveAnim: new Animated.Value(-2),
            title: "扫码签到",
            key: true,
            flashStatus: 'off'
        };
        this.requestCameraPermission = this.requestCameraPermission.bind(this)
    }


    componentWillMount() {
        // this.requestCameraPermission();
    }

    componentDidMount() {
        this.startAnimation();
    }

    //请求权限的方法
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '申请摄像头权限',
                    message:
                        '一个很牛逼的应用想借用你的摄像头，' +
                        '然后你就可以拍出酷炫的皂片啦。',
                    buttonNeutral: '等会再问我',
                    buttonNegative: '不行',
                    buttonPositive: '好吧',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('现在你获得摄像头权限了');
            } else {
                console.log('用户并不屌你');
                this.props.navigation.goBack()
            }
        } catch (err) {
            console.warn(err);
        }
    }

    /** 扫描框动画*/
    startAnimation = () => {
        this.state.moveAnim.setValue(-2);
        Animated.sequence([
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: 200,
                    duration: 1500,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: -1,
                    duration: 1500,
                    easing: Easing.linear
                }
            )
        ]).start(() => this.startAnimation())

    };

    //扫二维码跳转页面
    onBarCodeRead = (result) => {
        const { navigate } = this.props.navigation;
        const { data } = result; //只要拿到data就可以了
        //扫码后的操作
        if (this.state.key) {
            this.props.navigation.push('Work')
            this.setState({
                key: false
            })
        }
    };

    // handleFlash = () => {
    //     if(this.state.flashStatus !== 'on') {
    //         this.setState({
    //             flashStatus: 'on'
    //         })
    //     }
    //     else {
    //         this.setState({
    //             flashStatus: 'off'
    //         })
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <HeaderCmp title={this.state.title}
                        eggHandleBack={() => { this.props.navigation.goBack() }}
                        ></HeaderCmp>
                        {/* Children={<TouchableOpacity onPress={this.handleFlash} style={styles.flash} activeOpacity={0.6}>
                            <Text>闪光灯</Text>
                        </TouchableOpacity>}
                    /> */}
                </View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
                    style={[styles.preview,]}
                    type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
                    flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={{
                        width: 500,
                        height: 220,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }} />

                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />
                        <ImageBackground source={require('../../../images/respository/sao.png')} style={{ width: 200, height: 200 }}>
                            <Animated.View style={[
                                styles.border,
                                { transform: [{ translateY: this.state.moveAnim }] }]} />
                        </ImageBackground>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />

                    </View>

                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500, alignItems: 'center' }}>
                        <Text style={styles.rectangleText}>将二维码放入取景框内即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: "relative"
    },
    head: {
        height: pxToDp(205),
        width: '100%',
        position: "absolute",
        zIndex: 99,
        top: 0,
        left: 0
    },
    text: {
        color: "#fff"
    },
    flash: {
        width:pxToDp(180),
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#fcb602',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: pxToDp(20)
    },
    border: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#93f4f6',
        borderRadius: 50
    }
});
