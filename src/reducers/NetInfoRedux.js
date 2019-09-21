import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	isConnected: true
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.UPDATE_CONNECTION_STATUS:
			return {
				isConnected: action.payload
			};
		default:
			return state;
	}
};
