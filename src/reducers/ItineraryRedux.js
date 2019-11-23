import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	itineraries: [],
	isItineraryLastPage: [],
	countries: [],
	isCountryLastPage: []
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.SETUP_HOME_ITINERARIES:
			return {
				...state,
				itineraries: action.payload.content,
				isItineraryLastPage: action.payload.isLastPage
			};
		case Types.UPDATE_HOME_ITINERARIES:
			return {
				...state,
				itineraries: state.itineraries.concat(action.payload.content),
				isItineraryLastPage: action.payload.isLastPage
			};
		case Types.SETUP_COUNTRY:
			return {
				...state,
				countries: action.payload.content,
				isCountryLastPage: action.payload.isLastPage
			};
		case Types.UPDATE_COUNTRY:
			return {
				...state,
				countries: state.countries.concat(action.payload.content),
				isCountryLastPage: action.payload.isLastPage
			};
		default:
			return state;
	}
};
