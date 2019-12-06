import React from 'react';
import { View, Platform, Image, TouchableOpacity, TouchableNativeFeedback, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles, Color, Device, Images, Languages } from '@common';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const hitSlop = { top: 0, right: 15, bottom: 0, left: 15 };
// Icons for HeaderBar
const Title = (title, color) => (
	<Text ellipsizeMode={'tail'} numberOfLines={1} style={[ Styles.Common.toolbarTitleStyle, { color: color } ]}>
		{title}
	</Text>
);

const Settings = (navigation, color = Color.black) => (
	<Touchable activeOpacity={0.8} hitSlop={hitSlop} onPress={() => navigation.navigate('Settings')}>
		<View style={[ Styles.Common.Row, { right: 12, padding: 15 } ]}>
			<Icon name="settings" type="feather" color={color} size={Styles.IconSize.ToolBar} />
		</View>
	</Touchable>
);

const Back = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
			<Icon name="chevron-left" type="feather" color={color} />
		</View>
	</Touchable>
);

const Add = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
			<Icon name="plus" type="feather" color={color} />
		</View>
	</Touchable>
);

const AddBookmark = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}>
			<Icon name="bookmark-o" type={'font-awesome'} color={color} size={18} />
		</View>
	</Touchable>
);

const RemoveBookmark = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}>
			<Icon name="bookmark" type={'font-awesome'} color={color} size={18} />
		</View>
	</Touchable>
);

const CircleBack = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}>
			<Icon name="chevron-left" type="feather" color={color} />
		</View>
	</Touchable>
);

const MoreOptions = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}>
			<Icon name="more-vertical" type="feather" color={color} />
		</View>
	</Touchable>
);

const Save = (navigation, color = Color.white, onPress = undefined) => (
	<Touchable
		activeOpacity={0.8}
		hitSlop={hitSlop}
		onPress={
			onPress === undefined ? (
				() => {
					navigation.goBack(null);
				}
			) : (
				onPress
			)
		}
	>
		<View style={{ padding: 15 }}>
			{Platform.OS === 'ios' ? (
				<Text
					style={{
						color,
						fontSize: 16,
						fontFamily: 'Quicksand-Medium'
					}}
				>
					{Languages.Done}
				</Text>
			) : (
				<Icon name="check" type="feather" color={Color.black} />
			)}
		</View>
	</Touchable>
);

export { Title, Back, CircleBack, Settings, Add, AddBookmark, RemoveBookmark, MoreOptions, Save };
