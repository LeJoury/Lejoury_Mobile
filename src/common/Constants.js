let Constants = {};

Constants.Action = {
	Action: {
		ADD: 'ADD',
		EDIT: 'EDIT',
		REMOVE: 'REMOVE',
		UPDATE: 'UPDATE'
	}
};

Constants.Actions = {
	Types: {
		UPDATE_CONNECTION_STATUS: 'UPDATE_CONNECTION_STATUS',
		LOGOUT: 'LOGOUT',
		LOGIN_SUCCESS: 'LOGIN_SUCCESS',
		TOKEN_REFRESH_SUCCESS: 'TOKEN_REFRESH_SUCCESS',
		ADD_ITINERARIES: 'ADD_ITINERARIES',
		ADD_UPDATE_ITINERARY: 'ADD_UPDATE_ITINERARY',
		ADD_UPDATE_DAY: 'ADD_UPDATE_DAY',
		DELETE_UPDATE_ITINERARY: 'DELETE_UPDATE_ITINERARY'
	}
};

Constants.URL = {
	URL: {
		MAIN: 'http://103.75.190.53:8083',
		HERE_API: 'https://places.cit.api.here.com/places/v1/autosuggest?', //not using
		HERE_PLACE_URL: 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json?', //not using
		GOOGLE_PLACE_URL: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?',
		GOOGLE_PLACE_DETAILS_URL: 'https://maps.googleapis.com/maps/api/place/details/json?',
		URL_AUTH: 'auth',
		URL_LOGIN: 'login',
		URL_REFRESH_TOKEN: 'refresh-token',
		URL_REGISTER: 'register',
		URL_ITINERARY: 'itineraries',
		URL_ACTIVITY: 'activities',
		URL_UPLOAD_COVER_PHOTO: 'upload-thumbnail',
		URL_UPLOAD_PHOTO: 'upload-photo',
		URL_PUBLISH: 'publish',
		URL_BY_PUBLISHER: 'by-author',
		URL_SOCIAL_LOGIN: 'social-login'
	}
};

Constants.STATUS = {
	STATUS: {
		OK: 'OK',
		SUCCESS: 200
	}
};

Constants.PARAMS = {
	BASIC_PARAMS: {
		PLATFORM: 'platform',
		APP_VERSION: 'appVersion',
		DEVICE_TOKEN: 'deviceToken'
	},
	GOOGLE_API_PARAMS: {
		PLACE_ID: 'place_id',
		API_KEY: 'key',
		FIELDS: 'fields',
		INPUT: 'input'
	},
	GOOGLE_API_FIELDS_NAME: {
		NAME: 'name',
		COMPONENT: 'address_component',
		ADDRESS: 'formatted_address',
		GEOMETRY: 'geometry',
		TYPE: 'type',
		URL: 'url'
	},
	PARAMS_AUTH: {
		SOCIAL_ID: 'socialId',
		EMAIL_ADDRESS: 'email',
		PASSWORD: 'password',
		LOGIN_TYPE: 'loginType',
		USERNAME: 'username',
		FACEBOOK_ID: 'facebookId',
		GOOGLE_ID: 'googleId',
		PHOTO_URL: 'photoUrl'
	},
	PARAMS_ITINERARY: {
		ITINERARY_ID: 'itineraryId',
		USER_ID: 'userId',
		TITLE: 'title',
		DESTINATION: 'destination',
		QUOTE: 'quote',
		TOTAL_DAYS: 'totalDays',
		START_DATE: 'startDate',
		END_DATE: 'endDate',
		PUBLISH_STATUS: 'status'
	},
	PARAMS_DAY: {
		IDENTIFIER: 'identifier',
		DATE: 'date',
		DAY: 'day'
	},
	PARAMS_ACTIVITY: {
		TITLE: 'title',
		DESCRIPTION: 'description',
		PHOTOS: 'photos',
		BUDGET: 'budget',
		CURRENCY: 'currency',
		RATE: 'rating',
		LOCATION: 'location'
	},
	PARAMS_LOCATION: {
		STATE: 'state',
		COUNTRY: 'country',
		POSTCODE: 'postcode',
		LATITUDE: 'latitude',
		LONGITUDE: 'longitude',
		NAME: 'name',
		TYPES: 'types',
		LOCATION_URL: 'url'
	}
};

Constants.VERSION = {
	AUTH_API_VERSION: 'v1',
	ITINERARY_API_VERSION: 'v1',
	ACTIVITY_API_VERSION: 'v1'
};

Constants.Spinner = {
	Mode: {
		normal: 'normal',
		full: 'full',
		overlay: 'overlay',
		overlayLogin: 'overlayLogin'
	},
	Sizes: {
		SMALL: 'small',
		LARGE: 'large'
	}
};

Constants.ASYNCKEY = {
	ASYNCKEY: {
		SESSION: 'SESSION'
	}
};

export default Constants;
