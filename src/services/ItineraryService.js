import { Platform } from 'react-native';
import { Constants } from '@common';
import DeviceInfo from 'react-native-device-info';
import base from './Config';
import Bugsnag from './BugSnagService';

const TAG = 'ItineraryService';
const PUBLISH_STATUS_DRAFT = 'DRAFT';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { BASIC_PARAMS, PARAMS_ITINERARY, PARAMS_ACTIVITY, PARAMS_LOCATION, PARAMS_DAY } = Constants.PARAMS;
const { ITINERARY_API_VERSION, ACTIVITY_API_VERSION } = Constants.VERSION;

const { URL_ITINERARY, URL_ACTIVITY, URL_UPLOAD_COVER_PHOTO, URL_UPLOAD_PHOTO, URL_PUBLISH, URL_BY_PUBLISHER } = URL;
const { PLATFORM, APP_VERSION } = BASIC_PARAMS;

const CREATE_ITINERARY = async (itinerary, token, userId) => {
	const { USER_ID, TITLE, START_DATE, END_DATE } = PARAMS_ITINERARY;
	const { title, startDate, endDate } = itinerary;

	// DESTINATION, QUOTE, TOTAL_DAYS,

	let version = '';
	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'CREATE_ITINERARY - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let params = JSON.stringify({
		[USER_ID]: userId,
		[TITLE]: title,
		[START_DATE]: startDate,
		[END_DATE]: endDate,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${ITINERARY_API_VERSION}/${URL_ITINERARY}`, params, {
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
				Bugsnag.leaveBreadcrumb(TAG, `CREATE_ITINERARY - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const UPDATE_ITINERARY_BY_ID = async (itineraryId, itinerary, token, userId) => {
	const { USER_ID, TITLE, START_DATE, END_DATE } = PARAMS_ITINERARY;
	const { title, startDate, endDate } = itinerary;

	// DESTINATION, QUOTE, TOTAL_DAYS,

	let version = '';
	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'UPDATE_ITINERARY_BY_ID - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let params = JSON.stringify({
		[USER_ID]: userId,
		[TITLE]: title,
		[START_DATE]: startDate,
		[END_DATE]: endDate,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	return await new Promise((resolve, reject) => {
		base
			.put(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${itineraryId}`, params, {
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
				Bugsnag.leaveBreadcrumb(TAG, `UPDATE_ITINERARY_BY_ID - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const DELETE_ITINERARY_BY_ID = async (itineraryId, token) => {
	return await new Promise((resolve, reject) => {
		base
			.delete(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${itineraryId}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `DELETE_ITINERARY_BY_ID - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const DELETE_ACTIVITY_BY_ID = async (activityId, token) => {
	return await new Promise((resolve, reject) => {
		base
			.delete(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}/${activityId}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `DELETE_ACTIVITY_BY_ID - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const PUBLISH_ITINERARY_BY_ID = async (itineraryId, token) => {
	console.log(itineraryId);
	console.log(token);
	return await new Promise((resolve, reject) => {
		base
			.put(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${URL_PUBLISH}/${itineraryId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				console.log(response);
				resolve(response.data);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `PUBLISH_ITINERARY_BY_ID - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const UPLOAD_COVER_PHOTO = async (itineraryId, token, photo) => {
	const data = new FormData();

	data.append('thumbnail', {
		name: 'cover_photo.jpg',
		type: 'image/jpeg',
		uri: Platform.OS === 'android' ? photo : `file://${photo}`
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${URL_UPLOAD_COVER_PHOTO}/${itineraryId}`, data, {
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
				Bugsnag.leaveBreadcrumb(TAG, `UPLOAD_COVER_PHOTO - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const CREATE_ACTIVITY = async (newActivity, token, itineraryId, date, day) => {
	const { ITINERARY_ID } = PARAMS_ITINERARY;
	const { DAY, DATE } = PARAMS_DAY;
	const { TITLE, DESCRIPTION, BUDGET, CURRENCY, RATE, LOCATION } = PARAMS_ACTIVITY;
	const { STATE, COUNTRY, POSTCODE, LATITUDE, LONGITUDE, NAME, TYPES, LOCATION_URL } = PARAMS_LOCATION;

	const { location, budget, currency, description, rate, title } = newActivity;
	const { country, latitude, longitude, name, postcode, state, types, url } = location;

	let version = '';
	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'CREATE_ACTIVITY - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	let activityLocation = {
		[STATE]: state,
		[COUNTRY]: country,
		[POSTCODE]: postcode,
		[LATITUDE]: latitude,
		[LONGITUDE]: longitude,
		[NAME]: name,
		[TYPES]: types.toString(),
		[LOCATION_URL]: url
	};

	let params = JSON.stringify({
		[ITINERARY_ID]: itineraryId,
		[DAY]: day,
		[DATE]: date,
		[TITLE]: title,
		[DESCRIPTION]: description,
		[BUDGET]: budget,
		[CURRENCY]: currency,
		[RATE]: rate,
		[LOCATION]: activityLocation,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	console.log(params);
	return await new Promise((resolve, reject) => {
		base
			.post(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}`, params, {
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
				Bugsnag.leaveBreadcrumb(TAG, `CREATE_ACTIVITY - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const UPLOAD_ACTIVITY_PHOTOS = async (activityID, token, photos) => {
	const data = new FormData();

	for (var i = 0; i < photos.length; i++) {
		data.append('photos', {
			name: photos[i].filename,
			type: photos[i].mime,
			uri: photos[i].uri
		});
	}

	return await new Promise((resolve, reject) => {
		base
			.post(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}/${URL_UPLOAD_PHOTO}/${activityID}`, data, {
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
				Bugsnag.leaveBreadcrumb(TAG, `UPLOAD_COVER_PHOTO - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_DRAFT_ITINERARIES = async (token, userId) => {
	const { USER_ID, PUBLISH_STATUS } = PARAMS_ITINERARY;

	let params = `${USER_ID}=${userId}&${PUBLISH_STATUS}=${PUBLISH_STATUS_DRAFT}`;

	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${URL_BY_PUBLISHER}?${params}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_DRAFT_ITINERARIES - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_DRAFT_ITINERARY_DETAILS = async (token, itineraryId) => {
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARY}/${itineraryId}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_DRAFT_ITINERARY_DETAILS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_DRAFT_ACTIVITY_DETAILS = async (token, itineraryId, day) => {
	const { ITINERARY_ID } = PARAMS_ITINERARY;
	const { DAY } = PARAMS_DAY;

	return await new Promise((resolve, reject) => {
		base
			.get(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}?${ITINERARY_ID}=${itineraryId}&${DAY}=${day}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_DRAFT_ITINERARY_DETAILS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

export {
	CREATE_ITINERARY,
	CREATE_ACTIVITY,
	DELETE_ITINERARY_BY_ID,
	DELETE_ACTIVITY_BY_ID,
	UPDATE_ITINERARY_BY_ID,
	PUBLISH_ITINERARY_BY_ID,
	UPLOAD_COVER_PHOTO,
	UPLOAD_ACTIVITY_PHOTOS,
	GET_DRAFT_ITINERARY_DETAILS,
	GET_DRAFT_ITINERARIES,
	GET_DRAFT_ACTIVITY_DETAILS
};
