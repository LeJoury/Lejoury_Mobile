import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

const Heart = (props) => {
	const [ isLike, setLike ] = useState(props.isLike);

	const handleViewRef = (ref) => (this.view = ref);

	const onPress = () => {
		setLike(!isLike);
		this.view.bounceIn(500);
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Animatable.View ref={handleViewRef}>
				<Icon
					name={isLike ? 'heart' : 'heart-o'}
					type={'font-awesome'}
					size={props.heartIconSize === undefined ? Styles.IconSize.Small : props.heartIconSize}
					color={Color.red2}
				/>
			</Animatable.View>
		</TouchableWithoutFeedback>
	);
};
export default Heart;
