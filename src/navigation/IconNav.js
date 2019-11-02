import React from 'react';
import { View, Platform, Image, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles, Color, Device, Images, Languages } from '@common';

const hitSlop = { top: 0, right: 15, bottom: 0, left: 15 };
// Icons for HeaderBar
const Logo = () => <Image source={Images.splashScreenLogo} style={Styles.Common.logo} />;

const BlackBackView = (navigation, iconBack) => (
	<TouchableOpacity
		hitSlop={hitSlop}
		onPress={() => {
			navigation.goBack(null);
		}}
	>
		<Image
			source={iconBack ? iconBack : Images.icons.back}
			style={[ Styles.Common.toolbarIcon, iconBack && Styles.Common.iconBack ]}
		/>
	</TouchableOpacity>
);

const EmptyView = () => <View style={[ Styles.Common.Row, Platform.OS !== 'ios' && { right: -12 } ]} />;

const Title = (title, color) => (
	<Text ellipsizeMode={'tail'} numberOfLines={1} style={[ Styles.Common.toolbarTitleStyle, { color: color } ]}>
		{title}
	</Text>
);

const Settings = (navigation, color = Color.black) => (
	<View style={[ Styles.Common.Row, Platform.OS !== 'ios' && { right: -12 } ]}>
		<TouchableOpacity style={{ padding: 15 }} hitSlop={hitSlop} onPress={() => navigation.navigate('Settings')}>
			<Icon name="settings" type="feather" color={color} size={Styles.IconSize.ToolBar} />
		</TouchableOpacity>
	</View>
);

const TransparentHeader = (navigation, title, color = Color.black) => (
	<View style={[ Styles.Common.RowCenterBetween, Platform.OS !== 'ios' && { right: -12 } ]}>
		<View style={{ flex: 1, padding: 15 }} />
		<Text style={[ Styles.Common.toolbarTitleStyle, { color: color, flex: 1 } ]}>{title}</Text>
		<TouchableOpacity
			style={{ padding: 15, flex: 1, alignItems: 'flex-end' }}
			hitSlop={hitSlop}
			onPress={() => navigation.navigate('Settings')}
		>
			<Icon name="settings" type="feather" color={Color.lightGrey3} />
		</TouchableOpacity>
	</View>
);

const Back = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={{ paddingHorizontal: 15, paddingVertical: 10 }}
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
		<Icon name="chevron-left" type="feather" color={color} />
	</TouchableOpacity>
);

const Add = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={{ paddingHorizontal: 15, paddingVertical: 10 }}
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
		<Icon name="plus" type="feather" color={color} />
	</TouchableOpacity>
);

const AddBookmark = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}
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
		<Icon name="bookmark-o" type={'font-awesome'} color={color} size={18} />
	</TouchableOpacity>
);

const RemoveBookmark = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}
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
		<Icon name="bookmark" type={'font-awesome'} color={color} size={18} />
	</TouchableOpacity>
);

const ViewImages = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={[ Styles.Common.FloatCircle, { marginTop: 12 } ]}
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
		<Icon name="image" type="feather" color={color} size={18} />
	</TouchableOpacity>
);

const CircleBack = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={Styles.Common.FloatCircle}
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
		<Icon name="chevron-left" type="feather" color={color} />
	</TouchableOpacity>
);

const Cancel = (navigation, color = Color.white) => (
	<TouchableOpacity
		style={{ padding: 15 }}
		hitSlop={hitSlop}
		onPress={() => {
			navigation.goBack(null);
		}}
	>
		<Icon name="x" type="feather" color={color} />
	</TouchableOpacity>
);

const Save = (navigation, color = Color.white, onPress = undefined) => (
	<TouchableOpacity
		style={{ padding: 15 }}
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
		<Text
			style={{
				color,
				fontSize: 16,
				fontFamily: 'Quicksand-Medium'
			}}
		>
			{Languages.Done}
		</Text>
	</TouchableOpacity>
);

export {
	Logo,
	BlackBackView,
	EmptyView,
	Title,
	Back,
	CircleBack,
	Cancel,
	Settings,
	TransparentHeader,
	Add,
	AddBookmark,
	RemoveBookmark,
	ViewImages,
	Save
};
