import { Platform } from 'react-native';
import { Constants } from '@common';
import DeviceInfo from 'react-native-device-info';
import base from './Config';
import Bugsnag from './BugSnagService';

const TAG = 'ItineraryService';
const PUBLISH_STATUS_DRAFT = 'DRAFT';
const PUBLISH_STATUS_PUBLISHED = 'PUBLISHED';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { Action } = Constants.Action;
const {
	BASIC_PARAMS,
	PARAMS_ITINERARY,
	PARAMS_ACTIVITY,
	PARAMS_LOCATION,
	PARAMS_DAY,
	PARAMS_BOOKMARK
} = Constants.PARAMS;
const { ITINERARY_API_VERSION, ACTIVITY_API_VERSION, BOOKMARK_API_VERSION } = Constants.VERSION;

const {
	URL_ITINERARIES,
	URL_ACTIVITY,
	URL_UPLOAD_COVER_PHOTO,
	URL_PUBLISH,
	URL_BY_PUBLISHER,
	URL_COUNTRY_LIST,
	URL_BY_COUNTRY,
	URL_PHOTO,
	URL_BOOKMARK
} = URL;
const { PLATFORM, APP_VERSION, PAGE } = BASIC_PARAMS;

const CREATE_ITINERARY = async (itinerary, token, userId) => {
	const { USER_ID, TITLE, START_DATE, END_DATE } = PARAMS_ITINERARY;
	const { title, startDate, endDate } = itinerary;

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
			.post(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}`, params, {
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
	const { USER_ID, TITLE, START_DATE, END_DATE, QUOTE } = PARAMS_ITINERARY;
	const { title, startDate, endDate, quote } = itinerary;

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
		[APP_VERSION]: version,
		[QUOTE]: quote || ''
	});

	return await new Promise((resolve, reject) => {
		base
			.put(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, params, {
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
			.delete(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, {
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

const DELETE_ACTIVITY_PHOTO_BY_PHOTO_ID = async (photoId, token) => {
	return await new Promise((resolve, reject) => {
		base
			.delete(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}/${URL_PHOTO}/${photoId}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `DELETE_ACTIVITY_PHOTO_BY_PHOTO_ID - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const PUBLISH_ITINERARY_BY_ID = async (itineraryId, token) => {
	const { ITINERARY_ID, ACTION } = PARAMS_ITINERARY;

	let params = {
		[ACTION]: Action.PUBLISH
	};

	var formBody = [];
	for (var property in params) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(params[property]);
		formBody.push(encodedKey + '=' + encodedValue);
	}
	formBody = formBody.join('&');

	return await new Promise((resolve, reject) => {
		base
			.put(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, formBody, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
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

const UNPUBLISH_ITINERARY_BY_ID = async (itineraryId, token) => {
	const { ITINERARY_ID, ACTION } = PARAMS_ITINERARY;

	let params = {
		[ACTION]: Action.UNPUBLISH
	};

	var formBody = [];
	for (var property in params) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(params[property]);
		formBody.push(encodedKey + '=' + encodedValue);
	}
	formBody = formBody.join('&');

	return await new Promise((resolve, reject) => {
		base
			.put(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, formBody, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
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
			.post(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${URL_UPLOAD_COVER_PHOTO}/${itineraryId}`, data, {
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
	const {
		STATE,
		COUNTRY,
		POSTCODE,
		LATITUDE,
		LONGITUDE,
		NAME,
		TYPES,
		LOCATION_URL,
		ALPHA2,
		FULLADDRESS,
		PLACE_ID
	} = PARAMS_LOCATION;

	const { location, budget, currency, description, rating, title } = newActivity;
	const { country, latitude, longitude, name, postcode, state, types, url, alpha2, fullAddress, placeId } = location;

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
		[PLACE_ID]: placeId,
		[NAME]: name,
		[TYPES]: types.toString(),
		[LOCATION_URL]: url,
		[ALPHA2]: alpha2,
		[FULLADDRESS]: fullAddress
	};

	let params = JSON.stringify({
		[ITINERARY_ID]: itineraryId,
		[DAY]: day,
		[DATE]: date,
		[TITLE]: title,
		[DESCRIPTION]: description,
		[BUDGET]: budget,
		[CURRENCY]: currency,
		[RATE]: rating,
		[LOCATION]: activityLocation,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	// console.log(params);
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

const UPDATE_ACTIVITY = async (activityId, newActivity, token, itineraryId, date, day) => {
	const { ITINERARY_ID } = PARAMS_ITINERARY;
	const { DAY, DATE } = PARAMS_DAY;
	const { TITLE, DESCRIPTION, BUDGET, CURRENCY, RATE, LOCATION } = PARAMS_ACTIVITY;
	const {
		STATE,
		COUNTRY,
		POSTCODE,
		LATITUDE,
		LONGITUDE,
		NAME,
		TYPES,
		LOCATION_URL,
		ALPHA2,
		FULLADDRESS,
		PLACE_ID
	} = PARAMS_LOCATION;

	const { location, budget, currency, description, rating, title } = newActivity;
	const { country, latitude, longitude, name, postcode, state, types, url, alpha2, fullAddress, placeId } = location;

	let version = '';
	let activityLocation;

	try {
		version = await DeviceInfo.getVersion();
	} catch (error) {
		Bugsnag.leaveBreadcrumb(TAG, 'UPDATE_ACTIVITY - failed to get version');
		Bugsnag.notify(new Error(error));
	}

	if (types) {
		activityLocation = {
			[STATE]: state,
			[COUNTRY]: country,
			[POSTCODE]: postcode,
			[LATITUDE]: latitude,
			[LONGITUDE]: longitude,
			[PLACE_ID]: placeId,
			[NAME]: name,
			[TYPES]: types.toString(),
			[LOCATION_URL]: url,
			[ALPHA2]: alpha2,
			[FULLADDRESS]: fullAddress
		};
	}

	let params = JSON.stringify({
		[ITINERARY_ID]: itineraryId,
		[DAY]: day,
		[DATE]: date,
		[TITLE]: title,
		[DESCRIPTION]: description,
		[BUDGET]: budget,
		[CURRENCY]: currency,
		[RATE]: rating,
		[LOCATION]: activityLocation,
		[PLATFORM]: Platform.OS.toUpperCase(),
		[APP_VERSION]: version
	});

	console.log(params);

	return await new Promise((resolve, reject) => {
		base
			.put(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}/${activityId}`, params, {
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
				Bugsnag.leaveBreadcrumb(TAG, `UPDATE_ACTIVITY - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const UPLOAD_ACTIVITY_PHOTOS = async (activityID, token, photos) => {
	const data = new FormData();

	for (var i = 0; i < photos.length; i++) {
		if (!photos[i].id) {
			data.append('photos', {
				name: photos[i].filename,
				type: photos[i].mime,
				uri: photos[i].uri
			});
		}
	}

	return await new Promise((resolve, reject) => {
		base
			.post(`${ACTIVITY_API_VERSION}/${URL_ACTIVITY}/${activityID}/${URL_PHOTO}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `UPLOAD_ACTIVITY_PHOTOS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_DRAFT_ITINERARIES = async (token, userId, page) => {
	const { USER_ID, PUBLISH_STATUS } = PARAMS_ITINERARY;

	let params = `${USER_ID}=${userId}&${PUBLISH_STATUS}=${PUBLISH_STATUS_DRAFT}&${PAGE}=${page}`;
	// console.log('GET_DRAFT_ITINERARIES');

	Bugsnag.notify(new Error('Test error'));

	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${URL_BY_PUBLISHER}?${params}`, {
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

const GET_ITINERARIES = async (token, page) => {
	let params = `&${PAGE}=${page}`;
	// console.log('GET_ITINERARIES');
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}?${params}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_ITINERARIES - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const SEARCH_ITINERARIES = async (token, query, page) => {
	let params = `&${PAGE}=${page}&search=${query}`;
	console.log('SEARCH_ITINERARIES');

	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}?${params}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_ITINERARIES - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_DRAFT_ITINERARY_DETAILS = async (token, itineraryId) => {
	// console.log('GET_DRAFT_ITINERARY_DETAILS');

	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, {
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

	// console.log('GET_DRAFT_ACTIVITY_DETAILS');
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

const GET_PUBLISHED_ITINERARIES = async (token, userId, page) => {
	const { USER_ID, PUBLISH_STATUS } = PARAMS_ITINERARY;

	let params = `${USER_ID}=${userId}&${PUBLISH_STATUS}=${PUBLISH_STATUS_PUBLISHED}&${PAGE}=${page}`;

	// console.log('GET_PUBLISHED_ITINERARIES');
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${URL_BY_PUBLISHER}?${params}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_PUBLISHED_ITINERARIES - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_PUBLISHED_ITINERARY_DETAILS = async (token, itineraryId) => {
	// console.log('GET_PUBLISHED_ITINERARY_DETAILS');
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${itineraryId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				// console.log(response.data);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
				Bugsnag.leaveBreadcrumb(TAG, `GET_PUBLISHED_ITINERARY_DETAILS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_COUNTRIES = async (token) => {
	// console.log('GET_COUNTRIES');
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${URL_COUNTRY_LIST}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_COUNTRIES - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_ITINERARY_BY_COUNTRY = async (token, code, page) => {
	const { COUNTRY } = PARAMS_ITINERARY;

	let params = `${COUNTRY}=${code}&${PAGE}=${page}`;

	// console.log('GET_ITINERARY_BY_COUNTRY');
	return await new Promise((resolve, reject) => {
		base
			.get(`${ITINERARY_API_VERSION}/${URL_ITINERARIES}/${URL_BY_COUNTRY}?${params}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_ITINERARY_BY_COUNTRY - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const BOOKMARK = async (token, id, type, action) => {
	const { ID, TYPE, ACTION } = PARAMS_BOOKMARK;

	let params = JSON.stringify({
		[ID]: id,
		[TYPE]: type,
		[ACTION]: action
	});

	return await new Promise((resolve, reject) => {
		base
			.post(`${BOOKMARK_API_VERSION}/${URL_BOOKMARK}`, params, {
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
				Bugsnag.leaveBreadcrumb(TAG, `BOOKMARK - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

const GET_BOOKMARKS = async (token, type) => {
	const { TYPE } = PARAMS_BOOKMARK;

	// console.log('GET_BOOKMARKS');
	return await new Promise((resolve, reject) => {
		base
			.get(`${BOOKMARK_API_VERSION}/${URL_BOOKMARK}?${TYPE}=${type}`, {
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
				Bugsnag.leaveBreadcrumb(TAG, `GET_BOOKMARKS - ${error}`);
				Bugsnag.notify(new Error(error));
			});
	});
};

export {
	CREATE_ITINERARY,
	CREATE_ACTIVITY,
	DELETE_ITINERARY_BY_ID,
	DELETE_ACTIVITY_BY_ID,
	DELETE_ACTIVITY_PHOTO_BY_PHOTO_ID,
	UPDATE_ITINERARY_BY_ID,
	PUBLISH_ITINERARY_BY_ID,
	UNPUBLISH_ITINERARY_BY_ID,
	UPLOAD_COVER_PHOTO,
	UPLOAD_ACTIVITY_PHOTOS,
	UPDATE_ACTIVITY,
	GET_ITINERARIES,
	GET_DRAFT_ITINERARY_DETAILS,
	GET_DRAFT_ITINERARIES,
	GET_DRAFT_ACTIVITY_DETAILS,
	GET_PUBLISHED_ITINERARIES,
	GET_COUNTRIES,
	GET_ITINERARY_BY_COUNTRY,
	GET_PUBLISHED_ITINERARY_DETAILS,
	GET_BOOKMARKS,
	BOOKMARK,
	SEARCH_ITINERARIES
};
