import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	username: null,
	token: null,
	userId: null
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.LOGIN_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				token: action.payload.token,
				userId: action.payload.id
			};
		case Types.LOGOUT:
			return {
				...state,
				username: null,
				token: null
			};
		default:
			return state;
	}
};
