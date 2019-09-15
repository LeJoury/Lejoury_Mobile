import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Color, Constants } from '@common';
import styles from './styles';

const { Mode, Sizes } = Constants.Spinner;

class Spinner extends React.Component {
	render() {
		const { size, color, mode } = this.props;

		let containerStyle = styles.container;
		switch (mode) {
			case Mode.full:
				containerStyle = styles.container_full_stretch;
				break;
			case Mode.overlay:
				containerStyle = styles.container_overlay;
				break;
			case Mode.overlayLogin:
				containerStyle = styles.container_overlay_login;
				break;
		}
		return (
			<View style={containerStyle}>
				<ActivityIndicator
					size={size}
					color={color}
					style={[ styles.wrapper, { borderRadius: size == Sizes.SMALL ? 10 : 20 } ]}
				/>
			</View>
		);
	}
}

Spinner.defaultProps = {
	color: Color.primary,
	size: 'large',
	mode: Mode.normal
};

export default Spinner;
