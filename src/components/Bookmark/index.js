import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

const Bookmark = (props) => {
	const [ isBookmark, setBookmark ] = useState(props.isBookmark);

	const handleViewRef = (ref) => (this.view = ref);

	const onPress = () => {
		setBookmark(!isBookmark);
		this.view.bounceIn(500);
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={props.wrapperStyle}>
				<Animatable.View ref={handleViewRef}>
					<Icon
						name={isBookmark ? 'bookmark' : 'bookmark-o'}
						type={'font-awesome'}
						size={props.heartIconSize === undefined ? Styles.IconSize.Small : props.bookmarkIconSize}
						color={Color.orange}
					/>
				</Animatable.View>
				{props.children}
			</View>
			{/* {props.label && <Text style={props.labelStyle}>{props.label}</Text>} */}
		</TouchableWithoutFeedback>
	);
};
export default Bookmark;
