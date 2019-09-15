import { Platform, Dimensions } from 'react-native';

const dimen = Dimensions.get('window');
const isIphoneX =
	Platform.OS === 'ios' &&
	(dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896));

export default {
	isIphoneX,
	ToolbarHeight: isIphoneX ? 35 : 0
};
