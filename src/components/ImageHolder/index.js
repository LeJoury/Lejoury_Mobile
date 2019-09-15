import React, { Component } from 'react';
import { Animated, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

class ImageHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removeViewOpacity: new Animated.Value(0),
			canRemove: false
		};
	}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	showRemoveImageView = () => {
		this.setState(
			{
				canRemove: true
			},
			() => {
				Animated.timing(this.state.removeViewOpacity, {
					duration: 300,
					toValue: 1
				}).start(() => {
					Animated.sequence([
						Animated.delay(800),
						Animated.timing(this.state.removeViewOpacity, {
							duration: 300,
							toValue: 0
						})
					]).start(() => {
						this.setState({ canRemove: false });
					});
				});
			}
		);
	};

	removeRemoveView() {
		const { imageStyle, imageUri, onRemovePress } = this.props;

		if (!this.state.canRemove) return;

		return (
			<Animated.View
				style={[
					{
						top: 0,
						position: 'absolute',
						backgroundColor: Color.lightGrey6,
						opacity: this.state.removeViewOpacity,
						...Styles.Common.ColumnCenter
					},
					imageStyle
				]}
			>
				<TouchableOpacity
					onPress={() => (this.state.canRemove ? onRemovePress(imageUri) : this.showRemoveImageView)}
				>
					<Icon name="x" size={Styles.IconSize.CenterTab} type="feather" color={Color.red1} />
				</TouchableOpacity>
			</Animated.View>
		);
	}

	render() {
		const { containerStyle, imageStyle, imageUri } = this.props;

		return (
			<TouchableOpacity style={containerStyle} onPress={this.showRemoveImageView}>
				<Image style={imageStyle} source={{ uri: imageUri }} />
				{this.removeRemoveView()}
			</TouchableOpacity>
		);
	}
}
export default ImageHolder;
