import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

import { Color, Constants, Lottie, Languages } from '@common';
import styles from './styles';

const { Mode, Sizes } = Constants.Spinner;

class Spinner extends React.Component {
	render() {
		const { size, color, mode } = this.props;

		let containerStyle = styles.container;
		let wrapper = styles.wrapper;
		switch (mode) {
			case Mode.full:
				containerStyle = styles.container_full_stretch;
				break;
			case Mode.overlay:
				containerStyle = styles.container_full_stretch;
				break;
			case Mode.overlayLogin:
				containerStyle = styles.container_overlay_login;
				break;
			case Mode.createItinerary:
				containerStyle = styles.container_full_stretch;
				wrapper = styles.centerWrapper;
				break;
			case Mode.createActivity:
				containerStyle = styles.container_full_stretch;
				wrapper = styles.centerWrapper;
				break;
			case Mode.publishItinerary:
				containerStyle = styles.container_full_stretch;
				wrapper = styles.centerWrapper;
				break;
		}

		//creating itinerary
		if (mode === Mode.createItinerary) {
			return (
				<Modal backdropOpacity={0.5} isVisible={true} animationIn={'fadeIn'} animationOut={'fadeOut'}>
					<View style={containerStyle}>
						<View style={wrapper}>
							<LottieView source={Lottie.Creating_Itinerary} autoPlay loop style={styles.lottieLoader} />
							<Text style={styles.loadingMessage}>{Languages.Loading}</Text>
						</View>
					</View>
				</Modal>
			);
		} else if (mode === Mode.createActivity) {
			return (
				<Modal backdropOpacity={0.5} isVisible={true} animationIn={'fadeIn'} animationOut={'fadeOut'}>
					<View style={containerStyle}>
						<LottieView source={Lottie.Creating_Activity} autoPlay loop style={styles.lottieLoader} />
					</View>
				</Modal>
			);
		} else if (mode === Mode.publishItinerary) {
			return (
				<Modal backdropOpacity={0.5} isVisible={true} animationIn={'fadeIn'} animationOut={'fadeOut'}>
					<View style={containerStyle}>
						<LottieView source={Lottie.Publishing_Itinerary} autoPlay loop style={styles.lottieLoader} />
					</View>
				</Modal>
			);
		} else if (mode === Mode.overlay) {
			return (
				<Modal backdropOpacity={0.5} isVisible={true} animationIn={'fadeIn'} animationOut={'fadeOut'}>
					<View style={containerStyle}>
						<ActivityIndicator
							size={size}
							color={color}
							style={[ wrapper, { borderRadius: size == Sizes.SMALL ? 10 : 20 } ]}
						/>
					</View>
				</Modal>
			);
		} else {
			return (
				<View style={containerStyle}>
					<ActivityIndicator
						size={size}
						color={color}
						style={[ wrapper, { borderRadius: size == Sizes.SMALL ? 10 : 20 } ]}
					/>
				</View>
			);
		}
	}
}

Spinner.defaultProps = {
	color: Color.primary,
	size: 'large',
	mode: Mode.normal
};

export default Spinner;
