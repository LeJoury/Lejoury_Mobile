import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { Back, Title } from './IconNav';

import { Color, Device, Styles, Languages } from '@common';
import { TabBar, TopTabBar } from '@components';

import HomeScreen from './HomeScreen';

import ItineraryDetailsScreen from './ItineraryDetailsScreen';
import ActivityDetailScreen from './ActivityDetailScreen';
import ViewImagesScreen from './ViewImagesScreen';

import NotificationScreen from './NoticationScreen';

import BucketActivityScreen from './BucketActivityScreen';
import BucketItineraryScreen from './BucketItineraryScreen';

import AddItineraryScreen from './AddItineraryScreen';
import AddNewItineraryScreen from './AddNewItineraryScreen';
import AddItineraryDetailScreen from './AddItineraryDetailScreen';
import AddDayDetailScreen from './AddDayDetailScreen';
import AddActivityDetailScreen from './AddActivityDetailScreen';
import AddQuoteScreen from './AddQuoteScreen';

import EditProfileScreen from './EditProfileScreen';
import EditItineraryDetailScreen from './EditItineraryDetailScreen';
import EditDayDetailScreen from './EditDayDetailScreen';
import EditActivityDetailScreen from './EditActivityDetailScreen';

import ProfileScreen from './ProfileScreen';
import ProfileFollowerScreen from './ProfileFollowerScreen';
import ProfileFollowingScreen from './ProfileFollowingScreen';

import SettingsScreen from './SettingsScreen';

import LandingScreen from './LandingScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import TravellerListScreen from './TravellerListScreen';

import TravellerProfileScreen from './TravellerProfileScreen';
import ItineraryListScreen from './ItineraryListScreen';

import SplashScreen from './SplashScreen';

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

const AddActivityTransitionConfig = (sceneProps) => {
	if (
		sceneProps.scene.route.routeName === 'EditActivityDetail' ||
		sceneProps.scene.route.routeName === 'AddActivityDetail' ||
		sceneProps.scene.route.routeName === 'Landing'
	) {
		return {
			screenInterpolator: (sceneProps) => {
				const position = sceneProps.position;
				const scene = sceneProps.scene;
				const index = scene.index;

				return FadeTransition(index, position);
			}
		};
	} else if (sceneProps.scene.route.routeName === 'AddItineraryStack') {
		return {
			screenInterpolator: (sceneProps) => {
				const position = sceneProps.position;
				const scene = sceneProps.scene;
				const index = scene.index;

				// const { layout, position, scene } = sceneProps;
				// const { index } = scene;
				// const height = layout.initHeight;

				// return BottomTransition(index, position, height);
				return FadeTransition(index, position);
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

const AddItineraryStack = createStackNavigator(
	{
		AddItinerary: {
			screen: AddItineraryScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		AddNewItinerary: {
			screen: AddNewItineraryScreen,
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
		AddQuote: {
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

const BucketListTopTabbar = createMaterialTopTabNavigator(
	{
		Itinerary: { screen: BucketItineraryScreen },
		Activity: { screen: BucketActivityScreen }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerTitle: Title(Languages.BucketList, Color.headerTitleColor),
			headerStyle: Styles.Common.toolbar
		}),
		initialRouteName: 'Itinerary',
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

const BucketListStack = createStackNavigator({
	BucketList: {
		screen: BucketListTopTabbar,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	},
	BucketActivityDetail: {
		screen: ActivityDetailScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar,
			header: null
		}
	},
});

const FollowerTopTabbar = createMaterialTopTabNavigator(
	{
		Followers: { screen: ProfileFollowerScreen },
		Following: { screen: ProfileFollowingScreen }
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

const EditItineraryStack = createStackNavigator(
	{
		EditItineraryDetail: {
			screen: EditItineraryDetailScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		EditDayDetail: {
			screen: EditDayDetailScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		EditActivityDetail: {
			screen: EditActivityDetailScreen,
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

const ProfileStack = createStackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar,
			header: null
		}
	},
	ProfileItineraryDetails: {
		screen: ItineraryDetailsScreen,
		navigationOptions: {
			headerStyle: Styles.Common.toolbar
		}
	},
	ProfileFollower: {
		screen: FollowerTopTabbar
	},
	ProfileFollowing: {
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
				tabBarIcon: ({ tintColor }) => <Icon name="bookmark" type="feather" color={tintColor} />
			}
		},
		AddItinerary: {
			screen: AddItineraryStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null,
				tabBarIcon: ({ tintColor }) => (
					<Icon name="plus-circle" type="feather" size={Styles.IconSize.xxLarge} color={tintColor} />
				)
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
		AddItineraryStack: {
			screen: AddItineraryStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
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
		EditProfile: {
			screen: EditProfileScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		EditItineraryStack: {
			screen: EditItineraryStack,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
			}
		},
		TravellerList: {
			screen: TravellerListScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar
			}
		},
		TravellerProfile: {
			screen: TravellerProfileScreen,
			navigationOptions: {
				headerStyle: Styles.Common.toolbar,
				header: null
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

// AddItineraryStack.router.getStateForAction = navigateOnce(AddItineraryStack.router.getStateForAction);

// AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

MainNavigator.router.getStateForAction = navigateOnce(MainNavigator.router.getStateForAction);

const defaultGetStateForAction = MainNavigator.router.getStateForAction;
MainNavigator.router.getStateForAction = (action, state) => {
	if (state && action.type === NavigationActions.BACK && state.routes[state.index].routeName === 'Splash') {
		// Returning null indicates stack end, and triggers exit
		return null;
	}
	return defaultGetStateForAction(action, state);
};
