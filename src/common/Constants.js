let Constants = {};

Constants.Actions = {
	Types: {
		UPDATE_CONNECTION_STATUS: 'UPDATE_CONNECTION_STATUS',
		LOGOUT: 'LOGOUT',
		LOGIN: 'LOGIN',
		LOGIN_SUCCESS: 'LOGIN_SUCCESS',
		LOGIN_FAIL: 'LOGIN_FAIL',
		TOKEN_RESET: 'TOKEN_RESET',
		TOKEN_NAME_RESET: 'TOKEN_NAME_RESET',
		TOKEN_REFRESH: 'TOKEN_REFRESH',
		TOKEN_REFRESH_SUCCESS: 'TOKEN_REFRESH_SUCCESS',
		TOKEN_REFRESH_FAIL: 'TOKEN_REFRESH_FAIL',
		DISMISS_LOGIN_DIALOG: 'DISMISS_LOGIN_DIALOG',
		GET_PROFILE: 'GET_PROFILE',
		GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
		GET_PROFILE_FAIL: 'GET_PROFILE_FAIL',
		GET_PAYSLIPS: 'GET_PAYSLIPS',
		GET_PAYSLIPS_SUCCESS: 'GET_PAYSLIPS_SUCCESS',
		GET_PAYSLIPS_FAIL: 'GET_PAYSLIPS_FAIL',
		SET_SEARCH: 'SET_SEARCH',
		GETTING_DRAFT: 'GETTING_DRAFT',
		GET_ITINERARY_SUCCESS: 'GET_ITINERARY_SUCCESS',
		GET_ITINERARY_FAILED: 'GET_ITINERARY_FAILED',
		ADD_ITINERARY_TO_REDUX: 'ADD_ITINERARY_TO_REDUX',
		ADD_DAY_TO_REDUX: 'ADD_DAY_TO_REDUX'
	}
};

Constants.URL = {
	URL: {
		MAIN: 'http://13.229.70.227:5002',
		URL_AUTH: 'auth',
		URL_TOKEN: 'token',
		URL_REFRESH_TOKEN: 'token-refresh',
		URL_ACCOUNT: 'account',
		URL_CHANGE_USERNAME: 'change-username',
		URL_RESET_PASSWORD: 'reset-password',
		URL_MY_PROFILE: 'my-profile',
		URL_PAYROLL: 'payroll'
	}
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
