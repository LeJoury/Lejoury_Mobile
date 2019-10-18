import { updateItinerary, addItinerary, queryItineraryList, removeItinerary } from '../database/ItineraryService';
import { Constants } from '@common';

const { Types } = Constants.Actions;

// ----------------------------------- add or update draft itinerary to redux ----------------------------------- //
const addItineraryToRedux = (itinerary) => async (dispatch) => {
	dispatch({ type: Types.ADD_UPDATE_ITINERARY, payload: itinerary });
};

// ----------------------------------- add or update draft day details to redux ----------------------------------- //
const updateDayToItineraryRedux = (days, itineraryId) => async (dispatch) => {
	dispatch({ type: Types.ADD_UPDATE_DAY, payload: { days, itineraryId } });
};

// ----------------------------------- add itinerary draft ----------------------------------- //
// const addItineraryToDraft = (newItinerary, itineraryId) => async () => {
// 	return addItinerary(newItinerary, itineraryId);
// };

// ----------------------------------- add itinerary cover photo ----------------------------------- //
// const updateItineraryByID = (itinerary) => async () => {
// 	return updateItinerary(itinerary);
// };

// ----------------------------------- get itinerary draft ----------------------------------- //
// const getItineraryDraft = () => async (dispatch) => {
// 	dispatch({ type: Types.GETTING_DRAFT });

// 	queryItineraryList()
// 		.then((itinerary) => {
// 			dispatch({
// 				type: Types.GET_ITINERARY_SUCCESS,
// 				payload: itinerary
// 			});
// 		})
// 		.catch((error) => {
// 			dispatch({
// 				type: Types.GET_ITINERARY_FAILED
// 			});
// 		});
// };

// ----------------------------------- remove itinerary draft ----------------------------------- //
// const removeItineraryDraft = (id) => async () => {
// 	return removeItinerary(id);
// };

export {
	addItineraryToRedux,
	updateDayToItineraryRedux
	// addItineraryToDraft,
	// updateItineraryByID,
	// getItineraryDraft,
	// removeItineraryDraft
};
