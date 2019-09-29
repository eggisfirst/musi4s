import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './swiper/styles/SliderEntry.style';
import SliderEntry from './swiper/swiperCmp';
import styles, { colors } from './swiper/styles/index.styles';
import { ENTRIES1, ENTRIES2 } from './swiper/static/index';
import { scrollInterpolators, animatedStyles } from './swiper/utils/animation';
import pxToDp from '../../../../utils/fixcss';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/4s/video'


const IS_ANDROID = Platform.OS === 'android';
let SLIDER_1_FIRST_ITEM = 0;

class SwiperIndex extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    //     };

    // }
    state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        itemWidth: itemWidth
    }
   

    /**
     * 设置切换到哪一张
     */
    setActiveIndex = (index) => {
        this.props.videoControl(false)
        // console.log('index',this.props.urls[index])
       
        this.setState({
            slider1ActiveSlide: index
        })
     
    }

    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem({ item, index }) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem({ item, index }) {
        return <SliderEntry data={item} even={true} />;
    }

    mainExample(number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                {/* <Text style={styles.title}>{`Example ${number}`}</Text> */}
                {/* <Text style={styles.subtitle}>{title}</Text> */}
                {
                    this.props.urls && this.props.urls.length > 0 ?
                    <Carousel
                    layout={'stack'}
                    layoutCardOffset={18}
                    ref={c => this._slider1Ref = c}
                    data={this.props.urls}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={this.state.slider1ActiveSlide}
                    inactiveSlideScale={0.94}
                    noData={true}
                    inactiveSlideOpacity={0.7}
                     removeClippedSubviews={false}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    //   contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={false}
                    // swipe={false}
                    loopClonesPerSide={2}
                    //   autoplay={true}
                    //   autoplayDelay={500}
                    //   autoplayInterval={3000}
                    onSnapToItem={(index) =>{this.setActiveIndex(index)}}
                /> :
                <Text style={{marginLeft: pxToDp(300),marginTop: pxToDp(200)}}>暂无数据</Text>
                }
               
                {/* <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                /> */}
            </View>
        );
    }
    render() {
        return (
            <View>
                {
                    this.mainExample()
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, actions)(SwiperIndex)