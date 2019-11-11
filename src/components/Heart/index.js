import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

const Heart = (props) => {
	const handleViewRef = (ref) => (this.view = ref);

	const onPress = () => {
		this.view.bounceIn(500);
		props.onPress();
	};
	

	return (
		<TouchableWithoutFeedback onPress={onPress} disabled={props.disabled ? props.disabled : false}>
			<Animatable.View ref={handleViewRef}>
				<Icon
					name={props.liked ? 'heart' : 'heart-o'}
					type={'font-awesome'}
					size={props.heartIconSize === undefined ? Styles.IconSize.Small : props.heartIconSize}
					color={props.color ? props.color : Color.red2}
				/>
			</Animatable.View>
		</TouchableWithoutFeedback>
	);
};
export default Heart;
