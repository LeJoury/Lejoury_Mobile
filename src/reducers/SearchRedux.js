import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	isSearching: false
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.SET_SEARCH:
			return {
				...state,
				isSearching: action.payload
			};
		default:
			return state;
	}
};
