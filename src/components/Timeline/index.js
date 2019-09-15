import React, { Component } from 'react';
import { ListView, Image, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { Color, Languages, Styles } from '@common';

const { width, height } = Dimensions.get('window');

import styles from './styles';

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2,
	sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 18;
const defaultCircleColor = Color.primaryLight;
const defaultLineWidth = 1;
const defaultLineColor = Color.primaryLight;
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

export default class Timeline extends Component {
	constructor(props, context) {
		super(props, context);

		this.renderDetail = (this.props.renderDetail ? this.props.renderDetail : this._renderDetail).bind(this);
		this.renderCircle = (this.props.renderCircle ? this.props.renderCircle : this._renderCircle).bind(this);

		this._renderRow = this._renderRow.bind(this);
		this.renderEvent = (this.props.renderEvent ? this.props.renderEvent : this._renderEvent).bind(this);
		this.renderImage = this._renderImages.bind(this);

		this.state = {
			data: this.props.data,
			dataSource: ds.cloneWithRows(this.props.data),
			x: 0,
			width: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data,
			dataSource: ds.cloneWithRows(nextProps.data)
		});
	}

	render() {
		return (
			<View style={[ styles.container, this.props.style ]}>
				<ListView
					ref="listView"
					style={[ styles.listview, this.props.listViewStyle ]}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
					automaticallyAdjustContentInsets={false}
					{...this.props.options}
					scrollEnabled={false}
				/>
			</View>
		);
	}

	_renderRow(rowData, sectionID, rowID) {
		let content = null;

		content = (
			<View style={[ styles.rowContainer, this.props.rowContainerStyle ]}>
				{this.renderEvent(rowData, sectionID, rowID)}
				{this.renderCircle(rowData, sectionID, rowID)}
			</View>
		);

		return <View key={rowID}>{content}</View>;
	}

	_renderEvent(rowData, sectionID, rowID) {
		const lineWidth = rowData.lineWidth ? rowData.lineWidth : this.props.lineWidth;

		const isLast = this.state.data.slice(-1)[0] === rowData;
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
					if (!this.state.x && !this.state.width) {
						const { x, width } = evt.nativeEvent.layout;
						this.setState({ x, width });
					}
				}}
			>
				<TouchableOpacity
					disabled={this.props.onEventPress == null}
					style={{ paddingBottom: 8, paddingRight: 16 }}
					onPress={() => (this.props.onEventPress ? this.props.onEventPress(rowData) : null)}
				>
					<View style={styles.detail}>{this.renderDetail(rowData, sectionID, rowID)}</View>
					<View style={styles.readMoreWrapper}>
						<Text style={styles.readMore}>Read More</Text>
						<Icon color={Color.lightGrey3} size={12} name="chevron-right" />
					</View>
				</TouchableOpacity>

				{this._renderSeparator()}
			</View>
		);
	}

	_renderImages(rowData, sectionID, rowID) {
		const { photos } = rowData;

		return (
			<View style={styles.imageContainer}>
				{photos.length > 0 ? (
					<Swiper
						style={styles.imageWrapper}
						showsButtons={false}
						loop={true}
						autoplay={true}
						activeDotColor={Color.white}
						loadMinimalLoader={<ActivityIndicator />}
						loadMinimal={true}
					>
						{photos.map((uri, index) => {
							return (
								<Image
									source={{
										uri: uri,
										// cache: 'only-if-cached'
									}}
									style={styles.image}
									resizeMode="cover"
								/>
							);
						})}
					</Swiper>
				) : (
					<View style={styles.emptyImageContainer}>
						<Text style={styles.emptyImageDesc}>{Languages.ShareYourPhotos}</Text>
					</View>
				)}
			</View>
		);

		// return <View style={styles.imageWrapper} />;
	}

	_renderDetail(rowData, sectionID, rowID) {
		return (
			<View style={styles.container}>
				{this.renderImage(rowData, sectionID, rowID)}
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
						<Text style={[ styles.title, this.props.titleStyle ]}>{rowData.title}</Text>
					</View>
				</LinearGradient>
			</View>
		);
	}

	_renderCircle(rowData, sectionID, rowID) {
		var circleSize = rowData.circleSize
			? rowData.circleSize
			: this.props.circleSize ? this.props.circleSize : defaultCircleSize;
		var circleColor = rowData.circleColor
			? rowData.circleColor
			: this.props.circleColor ? this.props.circleColor : defaultCircleColor;
		var lineWidth = rowData.lineWidth
			? rowData.lineWidth
			: this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

		var circleStyle = null;

		const isLast = this.state.data.slice(-1)[0] === rowData;

		circleStyle = {
			width: this.state.x ? circleSize : 0,
			height: this.state.x ? circleSize : 0,
			borderRadius: circleSize / 2,
			backgroundColor: isLast ? Color.timelineLastCircle : circleColor,
			left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
		};

		var innerCircle = null;
		switch (this.props.innerCircle) {
			case 'icon':
				let iconSource = rowData.icon ? rowData.icon : this.props.icon;
				let iconStyle = {
					height: circleSize,
					width: circleSize
				};
				innerCircle = <Image source={iconSource} style={[ iconStyle, this.props.iconStyle ]} />;
				break;
			case 'dot':
				let dotStyle = {
					height: circleSize / 2,
					width: circleSize / 2,
					borderRadius: circleSize / 4,
					backgroundColor: rowData.dotColor
						? rowData.dotColor
						: this.props.dotColor ? this.props.dotColor : defaultDotColor
				};
				innerCircle = <View style={[ styles.dot, dotStyle ]} />;
				break;
		}
		return <View style={[ styles.circle, circleStyle, this.props.circleStyle ]}>{innerCircle}</View>;
	}

	_renderSeparator() {
		return <View style={styles.separator} />;
	}
}

Timeline.defaultProps = {
	circleSize: defaultCircleSize,
	circleColor: defaultCircleColor,
	lineWidth: defaultLineWidth,
	lineColor: defaultLineColor,
	innerCircle: defaultInnerCircle,
	separator: false
};
