import { Constants } from '@common';

const { Types } = Constants.Actions;

const INITIAL_STATE = {
	itineraries: []
};

const addOrUpdateItinerary = (itineraries, newItinerary) => {
	var tmpItineraries = itineraries;
	if (tmpItineraries.length === 0) {
		tmpItineraries.push(newItinerary);
	} else {
		var index = tmpItineraries.findIndex((itinerary) => itinerary.itineraryId === newItinerary.itineraryId);
		if (index === -1) {
			tmpItineraries.unshift(newItinerary);
		} else {
			tmpItineraries[index] = { ...tmpItineraries[index], ...newItinerary };
		}
	}

	return tmpItineraries;
};

const addOrUpdateDay = (itineraries, payload) => {
	var tmpItineraries = itineraries;
	var index = tmpItineraries.findIndex((itinerary) => itinerary.itineraryId === payload.itineraryId);

	if (index === -1) {
		//not found
	} else {
		tmpItineraries[index] = { ...tmpItineraries[index], days: payload.days };
	}

	return tmpItineraries;
};

const removeItinerary = (itineraries, itineraryId) => {
	var tmpItineraries = itineraries;
	return tmpItineraries.filter((itinerary) => itinerary.itineraryId !== itineraryId);
};

const removeActivityPhoto = (itineraries, payload) => {
	const { activityId, itineraryId, photoId } = payload;
	var tmpItinerary = itineraries.find((itinerary) => itinerary.itineraryId === itineraryId);
	let tmpActivity;
	for (let i = 0; i < tmpItinerary.days.length; i++) {
		tmpActivity = tmpItinerary.days[i].activities.find((activity) => activity.id === activityId);

		if (tmpActivity) {
			for (let noOfPhoto = 0; noOfPhoto < tmpActivity.photos.length; noOfPhoto++) {
				if (tmpActivity.photos[noOfPhoto].id === photoId) {
					tmpActivity.photos.splice(noOfPhoto, 1);
					break;
				}
			}
		}
	}

	var foundIndex = itineraries.findIndex((itinerary) => itinerary.itineraryId === payload.itineraryId);
	itineraries[foundIndex] = tmpItinerary;

	return itineraries;
};

const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.ADD_ITINERARIES:
			return {
				...state,
				itineraries: action.payload
			};
		case Types.ADD_UPDATE_ITINERARY:
			return {
				...state,
				itineraries: addOrUpdateItinerary(state.itineraries, action.payload)
			};
		case Types.ADD_UPDATE_DAY:
			return {
				...state,
				itineraries: addOrUpdateDay(state.itineraries, action.payload)
			};
		case Types.DELETE_UPDATE_ITINERARY:
			return {
				...state,
				itineraries: removeItinerary(state.itineraries, action.payload)
			};
		case Types.REMOVE_PHOTO:
			return {
				...state,
				itineraries: removeActivityPhoto(state.itineraries, action.payload)
			};
		default:
			return state;
	}
};

export { reducer };
