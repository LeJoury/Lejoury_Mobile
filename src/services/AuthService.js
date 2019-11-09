import { Platform } from 'react-native';
import { Constants } from '@common';
import DeviceInfo from 'react-native-device-info';
import base from './Config';
import Bugsnag from './BugSnagService';

const TAG = 'AuthService';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { BASIC_PARAMS, PARAMS_AUTH } = Constants.PARAMS;
const { AUTH_API_VERSION } = Constants.VERSION;

const { URL_AUTH, URL_LOGIN, URL_REGISTER, URL_REFRESH_TOKEN, URL_SOCIAL_LOGIN } = URL;
const { SOCIAL_ID, USERNAME, EMAIL_ADDRESS, PASSWORD, LOGIN_TYPE, FACEBOOK_ID, GOOGLE_ID, PHOTO_URL } = PARAMS_AUTH;
const { PLATFORM, APP_VERSION, DEVICE_TOKEN } = BASIC_PARAMS;

const LOGIN_TYPE_EMAIL = 'EMAIL';

const LOGIN_WITH_EMAIL = async (email, password) => {
	let version = '';

	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'LOGIN_WITH_EMAIL - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let params = JSON.stringify({
		[SOCIAL_ID]: '',
		[LOGIN_TYPE]: LOGIN_TYPE_EMAIL,
		[EMAIL_ADDRESS]: email,
		[PASSWORD]: password,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${AUTH_API_VERSION}/${URL_AUTH}/${URL_LOGIN}`, params, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `LOGIN_WITH_EMAIL - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const REGISTER_WITH_EMAIL = async (username, email, password) => {
	let version = '';

	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'REGISTER_WITH_EMAIL - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let params = JSON.stringify({
		[USERNAME]: username,
		[EMAIL_ADDRESS]: email,
		[PASSWORD]: password,
		[LOGIN_TYPE]: LOGIN_TYPE_EMAIL,
		[FACEBOOK_ID]: '', //social register
		[GOOGLE_ID]: '', //social register
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version,
		[DEVICE_TOKEN]: '' //push notifcation
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${AUTH_API_VERSION}/${URL_AUTH}/${URL_REGISTER}`, params, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `REGISTER_WITH_EMAIL - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const REFRESH_TOKEN = async (token) => {
	return await new Promise((resolve, reject) => {
		base
			.post(`${AUTH_API_VERSION}/${URL_AUTH}/${URL_REFRESH_TOKEN}`, '', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `REFRESH_TOKEN - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

// "appVersion": "string",
// "deviceToken": "string",
// "email": "string",
// "loginType": "EMAIL",
// "photoUrl": "string",
// "platform": "IOS",
// "socialId": "string",
// "username": "string"

const LOGIN_BY_SOCIAL = async (username, email, socialId, photoUrl, loginType) => {
	let version = '';

	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'REGISTER_WITH_EMAIL - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let params = JSON.stringify({
		[USERNAME]: username,
		[EMAIL_ADDRESS]: email,
		[SOCIAL_ID]: socialId,
		[LOGIN_TYPE]: loginType,
		[PHOTO_URL]: photoUrl,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version,
		[DEVICE_TOKEN]: '' //push notifcation
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${AUTH_API_VERSION}/${URL_AUTH}/${URL_SOCIAL_LOGIN}`, params, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `REGISTER_WITH_EMAIL - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

export { LOGIN_WITH_EMAIL, REGISTER_WITH_EMAIL, REFRESH_TOKEN, LOGIN_BY_SOCIAL };
