import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	itineraries: [],
	getLoading: false,
	draftItinerary: null
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.GETTING_DRAFT:
			return {
				...state,
				getLoading: true,
				itineraries: []
			};
		case Types.GET_ITINERARY_SUCCESS:
			return {
				...state,
				getLoading: false,
				itineraries: action.payload
			};
		case Types.GET_ITINERARY_FAILED:
			return {
				...state,
				getLoading: false,
				itineraries: []
			};
		case Types.ADD_ITINERARY_TO_REDUX:
			return {
				...state,
				draftItinerary: action.payload
			};
		case Types.ADD_DAY_TO_REDUX:
			return {
				...state,
				draftItinerary: {
					...state.draftItinerary,
					days: action.payload
				}
			};
		default:
			return state;
	}
};
