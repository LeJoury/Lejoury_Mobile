import { Platform } from 'react-native';
import { Constants } from '@common';
import DeviceInfo from 'react-native-device-info';
import base from './Config';
import Bugsnag from './BugSnagService';

const TAG = 'UserService';
const TYPE_LIKE = 'LIKE';
const TYPE_UNLIKE = 'UNLIKE';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { BASIC_PARAMS, PARAMS_TRAVELLER } = Constants.PARAMS;
const { TRAVELLER_API_VERSION } = Constants.VERSION;

const { URL_UPLOAD_PHOTO, URL_TRAVELLER, URL_FOLLOWER, URL_FOLLOWING, URL_ITINERARY, URL_LIKE, URL_PROFILE } = URL;
const { PLATFORM, APP_VERSION } = BASIC_PARAMS;

const GET_TRAVELLER_PROFILE = async (travellerId, token) => {
	const { TRAVELLER_ID } = PARAMS_TRAVELLER;

	return await new Promise((resolve, reject) => {
		base
			.get(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_PROFILE}?${TRAVELLER_ID}=${travellerId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `GET_TRAVELLER_PROFILE - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_TRAVELLER_FOLLOWERS = async (token, page) => {
	return await new Promise((resolve, reject) => {
		base //TODO: page in query -> scroll loading
			.get(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_FOLLOWER}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `GET_TRAVELLER_FOLLOWERS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_TRAVELLER_FOLLOWING = async (token, page) => {
	return await new Promise((resolve, reject) => {
		base //TODO: page in query -> scroll loading
			.get(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_FOLLOWING}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `GET_TRAVELLER_FOLLOWING - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const FOLLOW_NEW_TRAVELLER = async (token, travellerId, type) => {
	const { TRAVELLER_ID, TYPE } = PARAMS_TRAVELLER;

	let params = {
		[TRAVELLER_ID]: travellerId,
		[TYPE]: type
	};

	return await new Promise((resolve, reject) => {
		base
			.post(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_FOLLOWING}`, params, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `FOLLOW_NEW_TRAVELLER - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const LIKE_NEW_ITINERARY = async (token, itineraryId, type) => {
	const { ITINERARY_ID, TYPE } = PARAMS_TRAVELLER;

	let params = {
		[ITINERARY_ID]: itineraryId,
		[TYPE]: type === TYPE_LIKE ? TYPE_LIKE : TYPE_UNLIKE
	};

	return await new Promise((resolve, reject) => {
		base
			.post(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_ITINERARY}/${URL_LIKE}`, params, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `LIKE_NEW_ITINERARY - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const UPLOAD_PROFILE_PHOTO = async (token, photo) => {
	const data = new FormData();

	data.append('photo', {
		name: 'profile.jpg',
		type: photo.mime,
		uri: Platform.OS === 'android' ? photo : `file://${photo.path}`
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_UPLOAD_PHOTO}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `UPLOAD_PROFILE_PHOTO - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const EDIT_PROFILE = async (token, profile) => {
	return await new Promise((resolve, reject) => {
		base
			.put(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}/${URL_PROFILE}`, profile, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `EDIT_PROFILE - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_TRAVELLERS = async (token, page) => {
	return await new Promise((resolve, reject) => {
		base //TODO: page in query -> scroll loading
			.get(`${TRAVELLER_API_VERSION}/${URL_TRAVELLER}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `GET_TRAVELLER_FOLLOWING - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

export {
	GET_TRAVELLERS,
	GET_TRAVELLER_PROFILE,
	GET_TRAVELLER_FOLLOWERS,
	GET_TRAVELLER_FOLLOWING,
	FOLLOW_NEW_TRAVELLER,
	LIKE_NEW_ITINERARY,
	UPLOAD_PROFILE_PHOTO,
	EDIT_PROFILE
};
