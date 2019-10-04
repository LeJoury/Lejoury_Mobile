import React from 'react';
import { Dimensions, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { Back, Title } from './IconNav';

import { Color, Device, Styles } from '@common';
import { TabBar, TopTabBar } from '@components';

import HomeScreen from './HomeScreen';

import ItineraryDetailsScreen from './ItineraryDetailsScreen';
import ActivityDetailScreen from './ActivityDetailScreen';
import ViewImagesScreen from './ViewImagesScreen';

import NotificationScreen from './NoticationScreen';

import BucketListScreen from './BucketListScreen';

import UploadItineraryScreen from './UploadItineraryScreen';
import UploadNewItineraryScreen from './UploadNewItineraryScreen';
import AddItineraryDetailScreen from './AddItineraryDetailScreen';
import AddDayDetailScreen from './AddDayDetailScreen';
import AddActivityDetailScreen from './AddActivityDetailScreen';
import AddQuoteScreen from './AddQuoteScreen';

import EditProfileScreen from './EditProfileScreen';

import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

import LandingScreen from './LandingScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import TravellerListScreen from './TravellerListScreen';

import TravellerProfileScreen from './TravellerProfileScreen';
import ItineraryListScreen from './ItineraryListScreen';

import SplashScreen from './SplashScreen';

const uploadButtonStyle = {
	...Styles.Common.ColumnCenter,
	width: 70,
	height: 70,
	borderRadius: 35,
	paddingBottom: 4,
	marginBottom: Device.isIphoneX ? 10 : 15,
	backgroundColor: Color.primary,
	...Styles.Common.ShadowBox
};

const FadeTransition = (index, position) => {
	const sceneRange = [ index - 1, index ];
	const outputOpacity = [ 0, 1 ];
	const transition = position.interpolate({
		inputRange: sceneRange,
		outputRange: outputOpacity
	});

	return {
		opacity: transition
	};
};

const BottomTransition = (index, position, height) => {
	let sceneRange = [ index - 1, index ];
	let outputHeight = [ height, 0 ];

	let transition = position.interpolate({
		inputRange: sceneRange,
		outputRange: outputHeight,
	});
	return {
		transform: [ { translateY: transition } ]
	};
};

const AddActivityTransitionConfig = (sceneProps) => {
	if (sceneProps.scene.route.routeName === 'AddActivityDetail' || sceneProps.scene.route.routeName === 'Landing') {
		return {
			screenInterpolator: (sceneProps) => {
				const position = sceneProps.position;
				const scene = sceneProps.scene;
				const index = scene.index;

				return FadeTransition(index, position);
			}
		};
	} else if (sceneProps.scene.route.routeName === 'UploadItineraryStack') {
		return {
			screenInterpolator: (sceneProps) => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;
				const height = layout.initHeight;

				return BottomTransition(index, position, height);
			}
		};
	}
};

const HomeStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar,
			header: null
		}
	},
	TravellerProfile: {
		screen: TravellerProfileScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	},
	ItineraryList: {
		screen: ItineraryListScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	}
});

const NotificationStack = createStackNavigator({
	Notification: {
		screen: NotificationScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	}
});

const ItineraryDetailStack = createStackNavigator({
	ItineraryDetails: {
		screen: ItineraryDetailsScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar,
			header: null
		}
	},
	ActivityDetail: {
		screen: ActivityDetailScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar,
			header: null
		}
	},
	ViewImages: {
		screen: ViewImagesScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	}
});

const UploadItineraryStack = createStackNavigator(
	{
		UploadItinerary: {
			screen: UploadItineraryScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		UploadNewItineraryScreen: {
			screen: UploadNewItineraryScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		AddItineraryDetail: {
			screen: AddItineraryDetailScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		AddDayDetail: {
			screen: AddDayDetailScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		AddActivityDetail: {
			screen: AddActivityDetailScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		AddQuote:{
			screen: AddQuoteScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		}
	},
	{
		transitionConfig: AddActivityTransitionConfig,
		defaultNavigationOptions: {
			gesturesEnabled: false
		}
	}
);

const BucketListStack = createStackNavigator({
	BucketList: {
		screen: BucketListScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	}
});

const FollowerTopTabbar = createMaterialTopTabNavigator(
	{
		Followers: { screen: TravellerListScreen },
		Following: { screen: TravellerListScreen }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerLeft: Back(navigation, Color.primary, () => navigation.goBack()),
			headerTitle: Title(navigation.state.params.username, Color.headerTitleColor),
			headerStyle: Styles.Common.toolbar
		}),
		initialRouteName: 'Followers',
		tabBarPosition: 'top',
		animationEnabled: true,
		lazy: true,
		swipeEnabled: true,
		tabBarComponent: TopTabBar,
		tabBarOptions: {
			activeTintColor: Color.tabbarTint,
			inactiveTintColor: Color.tabbarInActiveColor,
			style: {
				backgroundColor: Color.transparent
			}
		}
	}
);

const ProfileStack = createStackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	},
	ProfileItineraryDetails: {
		screen: ItineraryDetailsScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	},
	TravellerListScreen: {
		screen: FollowerTopTabbar
	}
});

const AppNavigator = createBottomTabNavigator(
	{
		HomeStack: {
			screen: HomeStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <Icon name="home" type="feather" color={tintColor} />
			}
		},
		BucketListStack: {
			screen: BucketListStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <Icon name="heart" type="feather" color={tintColor} />
			}
		},
		UploadItinerary: {
			screen: UploadItineraryStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null,
				tabBarIcon: ({ tintColor }) => (
					<Icon name="plus-circle" type="feather" size={Styles.IconSize.xxLarge} color={tintColor} />
				)
				// tabBarIcon: () => (
				// 	<View style={uploadButtonStyle}>
				// 		<Icon name="plus" type="feather" color={Color.white} size={Styles.IconSize.CenterTab} />
				// 	</View>
				// )
			}
		},
		NotificationStack: {
			screen: NotificationStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <Icon name="bell" type="feather" color={tintColor} />
			}
		},
		ProfileStack: {
			screen: ProfileStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <Icon name="user" type="feather" color={tintColor} />
			}
		}
	},
	{
		initialRouteName: 'HomeStack',
		tabBarComponent: TabBar,
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		animationEnabled: false,
		tabBarOptions: {
			showIcon: true,
			activeTintColor: Color.tabbarTint,
			inactiveTintColor: Color.tabbarInActiveColor
		},
		lazy: true
	}
);

const MainNavigator = createStackNavigator(
	{
		Splash: { screen: SplashScreen, navigationOptions: { header: null } },
		Landing: {
			screen: LandingScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		ForgotPassword: {
			screen: ForgotPasswordScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		Main: {
			screen: AppNavigator,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		UploadItineraryStack: {
			screen: UploadItineraryStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null,
				tabBarIcon: ({ tintColor }) => <Icon name="plus-circle" type="feather" color={tintColor} />
			}
		},
		ItineraryDetailStack: {
			screen: ItineraryDetailStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		Settings: {
			screen: SettingsScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		EditProfileScreen: {
			screen: EditProfileScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		}
	},
	{
		initialRouteName: 'Splash',
		transitionConfig: AddActivityTransitionConfig,
		defaultNavigationOptions: {
			gesturesEnabled: false,
			headerStyle: Styles.Common.toolbar
		}
	}
);

export default createAppContainer(MainNavigator);

const navigateOnce = (getStateForAction) => (action, state) => {
	const { type, routeName } = action;
	return state && type === NavigationActions.NAVIGATE && routeName === state.routes[state.routes.length - 1].routeName
		? null
		: getStateForAction(action, state);
};

// HomeStack.router.getStateForAction = navigateOnce(HomeStack.router.getStateForAction);

// ProfileStack.router.getStateForAction = navigateOnce(ProfileStack.router.getStateForAction);

// AttendanceStack.router.getStateForAction = navigateOnce(AttendanceStack.router.getStateForAction);

// UploadItineraryStack.router.getStateForAction = navigateOnce(UploadItineraryStack.router.getStateForAction);

// AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

MainNavigator.router.getStateForAction = navigateOnce(MainNavigator.router.getStateForAction);

const defaultGetStateForAction = MainNavigator.router.getStateForAction;
MainNavigator.router.getStateForAction = (action, state) => {
	if (state && action.type === NavigationActions.BACK && state.routes[state.index].routeName === 'Splash') {
		// console.log(state.routes[state.index].routeName);

		// Returning null indicates stack end, and triggers exit
		return null;
	}
	return defaultGetStateForAction(action, state);
};
