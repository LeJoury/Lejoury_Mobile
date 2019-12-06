import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const Bookmark = (props) => {
	const handleViewRef = (ref) => (this.view = ref);

	const onPress = () => {
		this.view.bounceIn(500);
		props.onBookmarkPress();
	};

	return (
		<Touchable onPress={onPress} activeOpacity={0.8}>
			<View style={props.wrapperStyle}>
				<Animatable.View ref={handleViewRef}>
					<Icon
						name={props.isBookmark ? 'bookmark' : 'bookmark-o'}
						type={'font-awesome'}
						size={props.heartIconSize === undefined ? Styles.IconSize.Small : props.bookmarkIconSize}
						color={Color.orange}
					/>
				</Animatable.View>
				{props.children}
			</View>
		</Touchable>
	);
};
export default Bookmark;
