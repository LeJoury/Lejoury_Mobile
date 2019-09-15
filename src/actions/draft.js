import {
	updateItinerary,
	addItinerary,
	queryItineraryList,
	removeItinerary
} from '../services/ItineraryService';
import { Constants } from '@common';

const { Types } = Constants.Actions;

// ----------------------------------- add draft itinerary to redux ----------------------------------- //
const addItineraryToRedux = (itinerary) => async (dispatch) => {
	dispatch({ type: Types.ADD_ITINERARY_TO_REDUX, payload: itinerary });
};

// ----------------------------------- add draft day details to redux ----------------------------------- //
const addDayToItineraryRedux = (days) => async (dispatch) => {
	dispatch({ type: Types.ADD_DAY_TO_REDUX, payload: days });
};

// ----------------------------------- add itinerary draft ----------------------------------- //
const addItineraryToDraft = (itineraryName, startDate, endDate) => async () => {
	return addItinerary(itineraryName, startDate, endDate);
};

// ----------------------------------- add itinerary cover photo ----------------------------------- //
const updateItineraryByID = (itinerary) => async () => {
	return updateItinerary(itinerary);
};

// ----------------------------------- get itinerary draft ----------------------------------- //
const getItineraryDraft = () => async (dispatch) => {
	dispatch({ type: Types.GETTING_DRAFT });

	queryItineraryList()
		.then((itinerary) => {
			// console.log(itinerary);
			dispatch({
				type: Types.GET_ITINERARY_SUCCESS,
				payload: itinerary
			});
		})
		.catch((error) => {
			// console.log(error);
			dispatch({
				type: Types.GET_ITINERARY_FAILED
			});
		});
};

// ----------------------------------- remove itinerary draft ----------------------------------- //
const removeItineraryDraft = (id) => async () => {
	return removeItinerary(id);
};

export {
	addItineraryToRedux,
	addDayToItineraryRedux,
	addItineraryToDraft,
	updateItineraryByID,
	getItineraryDraft,
	removeItineraryDraft
};
