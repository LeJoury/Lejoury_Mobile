import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	username: null,
	token: null,
	errorMessage: '',
	loading: false
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.LOGIN:
			return {
				...state,
				username: null,
				token: null,
				loading: true,
				errorMessage: ''
			};
		case Types.LOGIN_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				token: action.payload.token,
				loading: false,
				errorMessage: ''
			};
		case Types.LOGIN_FAIL:
			return {
				...state,
				username: null,
				token: null,
				errorMessage: action.payload,
				loading: false
			};
		case Types.LOGOUT:
			return {
				...state,
				username: null,
				token: null,
				loading: false,
				errorMessage: ''
			};
		case Types.TOKEN_REFRESH:
			return {
				...state
			};
		case Types.TOKEN_RESET:
			return {
				...state,
				token: action.payload
			};
		case Types.TOKEN_NAME_RESET:
			return {
				...state,
				username: action.payload.name,
				token: action.payload.token
			};
		case Types.TOKEN_REFRESH_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				token: action.payload.token,
				errorMessage: ''
			};
		case Types.TOKEN_REFRESH_FAIL:
			return {
				...state,
				username: null,
				token: null,
				loading: false
			};
		case Types.DISMISS_LOGIN_DIALOG:
			return {
				...state,
				errorMessage: ''
			};
		default:
			return state;
	}
};
