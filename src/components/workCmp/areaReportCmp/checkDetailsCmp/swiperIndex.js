import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './swiper/styles/SliderEntry.style';
import SliderEntry from './swiper/swiperCmp';
import styles, { colors } from './swiper/styles/index.styles';
import { ENTRIES1, ENTRIES2 } from './swiper/static/index';
import { scrollInterpolators, animatedStyles } from './swiper/utils/animation';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class SwiperIndex extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    //     };

    // }
    state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    }

    setActiveIndex = (index) => {
        console.log('index',index)
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
                <Carousel
                    layout={'stack'}
                    ref={c => this._slider1Ref = c}
                    data={this.props.urls}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    //   contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    swipe={true}
                    loopClonesPerSide={2}
                    //   autoplay={true}
                    //   autoplayDelay={500}
                    //   autoplayInterval={3000}
                    onSnapToItem={(index) =>{this.setActiveIndex(index)}}
                />
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