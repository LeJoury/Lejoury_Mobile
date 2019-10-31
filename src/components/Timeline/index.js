import React, { PureComponent } from 'react';
import { FlatList, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import { Color, Styles, Languages } from '@common';
import { Bookmark } from '@components';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

const defaultCircleSize = 16;
const defaultCircleColor = Color.black;
const defaultLineWidth = 1;
const defaultLineColor = Color.primaryLight;
const defaultDotColor = Color.white;
const defaultInnerCircle = 'none';

export default class Timeline extends PureComponent {
	constructor(props, context) {
		super(props, context);

		this.state = {
			data: this.props.data,
			dataSource: this.props.data,
			x: 0,
			width: 0
		};
	}
	_keyExtractor = (item, index) => index.toString();

	render() {
		return (
			<View style={[ styles.container, this.props.style ]}>
				<FlatList
					keyExtractor={this._keyExtractor}
					style={[ styles.listview, this.props.listViewStyle ]}
					data={this.state.dataSource}
					renderItem={this.renderRow}
					automaticallyAdjustContentInsets={false}
					{...this.props.options}
					scrollEnabled={false}
				/>
			</View>
		);
	}

	renderRow = ({ item, index }) => {
		let content = null;

		content = (
			<View style={[ styles.rowContainer, this.props.rowContainerStyle ]}>
				{this.renderEvent(item)}
				{this.renderCircle(item)}
			</View>
		);

		return <View key={index}>{content}</View>;
	};

	renderEvent = (item) => {
		const lineWidth = this.props.lineWidth;

		const isLast = this.state.data.slice(-1)[0] === item;
		const lineColor = isLast ? Color.timelineLastLine : defaultLineColor;

		let opStyle = null;

		opStyle = {
			borderColor: lineColor,
			borderLeftWidth: lineWidth,
			borderRightWidth: 0,
			marginLeft: 20,
			paddingLeft: 20
		};

		return (
			<View
				style={[ styles.details, opStyle ]}
				onLayout={(evt) => {
					if (this.state.x === 0 || !this.state.width === 0) {
						const { x, width } = evt.nativeEvent.layout;
						this.setState({ x, width });
					}
				}}
			>
				<TouchableOpacity
					disabled={this.props.onEventPress == null}
					style={{ paddingBottom: 8, paddingRight: 16 }}
					onPress={() => (this.props.onEventPress ? this.props.onEventPress(item) : null)}
				>
					<View style={styles.detail}>{this.renderDetail(item)}</View>
					<View style={Styles.Common.RowCenterBetween}>
						<TouchableOpacity>
							<Bookmark isBookmark={false} wrapperStyle={styles.readMoreWrapper}>
								<Text style={styles.addToBookmark}>{Languages.Bookmark}</Text>
							</Bookmark>
						</TouchableOpacity>
						<View style={styles.readMoreWrapper}>
							<Text style={styles.readMore}>{Languages.ReadMore}</Text>
							<Icon color={Color.lightGrey3} size={12} type="feather" name="chevron-right" />
						</View>
					</View>
				</TouchableOpacity>

				{this.renderSeparator()}
			</View>
		);
	};

	renderImages = (item) => {
		const { photos } = item;

		return (
			<View style={styles.imageContainer}>
				{photos.length > 0 && (
					<Swiper
						style={styles.imageWrapper}
						showsButtons={false}
						loop={true}
						autoplay={true}
						activeDotColor={Color.white}
						loadMinimalLoader={<ActivityIndicator />}
						loadMinimal={true}
					>
						{photos.map((photo, index) => {
							return (
								<LoadImage
									source={{
										uri: photo.link
										// cache: 'only-if-cached'
									}}
									style={styles.image}
									resizeMode={FastImage.resizeMode.cover}
								/>
							);
						})}
					</Swiper>
				)}
			</View>
		);
	};

	renderDetail = (item) => {
		return (
			<View style={styles.container}>
				{this.renderImages(item)}
				<LinearGradient
					colors={[
						Color.black70T,
						Color.black30T,
						Color.transparent1,
						Color.transparent1,
						Color.transparent1
					]}
					style={styles.gradientContainer}
				>
					<View style={styles.titleContainer}>
						<Text style={[ styles.title, this.props.titleStyle ]}>{item.title}</Text>
					</View>
				</LinearGradient>
			</View>
		);
	};

	renderCircle = (item) => {
		var circleSize = this.props.circleSize ? this.props.circleSize : defaultCircleSize;
		var circleColor = this.props.circleColor ? this.props.circleColor : defaultCircleColor;
		var lineWidth = this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;
		const isLast = this.state.data.slice(-1)[0] === item;

		var circleStyle = null;
		circleStyle = {
			width: circleSize,
			height: circleSize,
			borderRadius: circleSize / 2,
			backgroundColor: isLast ? Color.timelineLastCircle : circleColor,
			left: 20 - circleSize / 2 + (lineWidth - 1) / 2
		};

		var innerCircle = null;
		let dotStyle = {
			height: circleSize / 1.2,
			width: circleSize / 1.2,
			borderRadius: circleSize / 2.4,
			backgroundColor: this.props.dotColor ? this.props.dotColor : defaultDotColor
		};

		innerCircle = <View style={[ styles.dot, dotStyle ]} />;

		return <View style={[ styles.circle, circleStyle, this.props.circleStyle ]}>{innerCircle}</View>;
	};

	renderSeparator = () => {
		return <View style={styles.separator} />;
	};
}

Timeline.defaultProps = {
	circleSize: defaultCircleSize,
	circleColor: defaultCircleColor,
	lineWidth: defaultLineWidth,
	lineColor: defaultLineColor,
	innerCircle: defaultInnerCircle,
	separator: false
};
