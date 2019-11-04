import { Alert } from 'react-native';
import { Languages } from '@common';

const toCapitalized = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const getCountryCurrency = (name) => {
	const currencies = require('../../assets/currency-symbols.json');

	return currencies[name];
};

const getCountry = (code) => {
	if (code === 'MY') return 'Malaysia';
	else if (code === 'SG') return 'Singapore';
};

const calculateDays = (date1, date2) => {
	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	var diff = new Date(date2_ms - date1_ms);

	// Convert back to days and return
	return diff.getUTCDate();
};

const create_UUID = () => {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = ((dt + Math.random() * 16) % 16) | 0;
		dt = Math.floor(dt / 16);
		return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
};

const realmObjectToArray = (realmObject) => {
	return JSON.parse(JSON.stringify(realmObject));
};

const formatImages = (images) => {
	var formattedImages = [];

	for (let i = 0; i < images.length; i++) {
		let formatted = {
			url: images[i].link
		};
		formattedImages.push(formatted);
	}

	return formattedImages;
};

const getMonths = () => {
	return [
		Languages.Jan,
		Languages.Feb,
		Languages.Mar,
		Languages.Apr,
		Languages.May,
		Languages.Jun,
		Languages.Jul,
		Languages.Aug,
		Languages.Sep,
		Languages.Oct,
		Languages.Nov,
		Languages.Dec
	];
};

const showOkAlert = (title, description, buttonText = Languages.OK, onButtonPress = undefined) => {
	Alert.alert(title, description, [
		{
			text: buttonText,
			onPress: onButtonPress
		}
	]);
};

const validateEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
	var re = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$/;
	return re.test(String(password).toLowerCase());
};

const createStaggerAnimationStyle = (animation) => {
	const translateY = animation.interpolate({
		inputRange: [ 0, 1 ],
		outputRange: [ 15, 0 ]
	});

	return {
		opacity: animation,
		transform: [
			{
				translateY
			}
		]
	};
};

export {
	toCapitalized,
	getCountry,
	getCountryCurrency,
	calculateDays,
	create_UUID,
	realmObjectToArray,
	formatImages,
	getMonths,
	showOkAlert,
	validateEmail,
	validatePassword,
	createStaggerAnimationStyle
};
