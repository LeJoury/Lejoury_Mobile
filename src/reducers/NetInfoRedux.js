import { UPDATE_CONNECTION_STATUS } from '@common';

const INITIAL_STATE = {
	isConnected: true
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case UPDATE_CONNECTION_STATUS:
			return Object.assign({}, state, {
				isConnected: action.isConnected
			});
		default:
			return state;
	}
};
