import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	itineraries: []
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.SETUP_HOME_ITINERARIES:
			return {
				...state,
				itineraries: action.payload
			};
		default:
			return state;
	}
};
