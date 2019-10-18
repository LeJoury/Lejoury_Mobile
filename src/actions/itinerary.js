import { Languages, Constants } from '@common';

import {
	CREATE_ITINERARY,
	CREATE_ACTIVITY,
	DELETE_ITINERARY_BY_ID,
	DELETE_ACTIVITY_BY_ID,
	UPDATE_ITINERARY_BY_ID,
	PUBLISH_ITINERARY_BY_ID,
	UPLOAD_COVER_PHOTO,
	UPLOAD_ACTIVITY_PHOTOS,
	GET_DRAFT_ITINERARY_DETAILS,
	GET_DRAFT_ITINERARIES,
	GET_DRAFT_ACTIVITY_DETAILS
} from '@services';

const { STATUS } = Constants.STATUS;
const { Types } = Constants.Actions;

// ----------------------------------- create itinerary ----------------------------------- //
const createItinerary = (itinerary, token, userId) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		CREATE_ITINERARY(itinerary, token, userId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, itineraryId: result.data.itineraryId };

					let tmpItinerary = {
						...itinerary,
						coverPhoto: null,
						itineraryId: response.itineraryId
					};

					dispatch({
						type: Types.ADD_UPDATE_ITINERARY,
						payload: tmpItinerary
					});

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- update itinerary by id ----------------------------------- //
const updateItineraryByID = (itineraryId, itinerary, token, userId) => async (dispatch) => {
	console.log(itinerary);
	return new Promise((resolve, reject) => {
		UPDATE_ITINERARY_BY_ID(itineraryId, itinerary, token, userId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };
					console.log(response);

					// dispatch({
					// 	type: Types.ADD_UPDATE_ITINERARY,
					// 	payload: itinerary
					// });

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- delete itinerary by id ----------------------------------- //
const deleteItineraryByID = (itineraryId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		DELETE_ITINERARY_BY_ID(itineraryId, token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.DELETE_UPDATE_ITINERARY,
						payload: itineraryId
					});

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- delete activity by id ----------------------------------- //
const deleteActivityByID = (activityId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		DELETE_ACTIVITY_BY_ID(activityId, token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- publish itinerary by id ----------------------------------- //
const publishItineraryByID = (itineraryId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		PUBLISH_ITINERARY_BY_ID(itineraryId, token)
			.then((result) => {
				console.log(result);
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- upload itinerary cover photo ----------------------------------- //
const uploadCoverPhoto = (itineraryId, token, photo) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		UPLOAD_COVER_PHOTO(itineraryId, token, photo)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, token: result.token };

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- create activity ----------------------------------- //
const createActivity = (activity, token, itineraryId, date, identifier) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		CREATE_ACTIVITY(activity, token, itineraryId, date, identifier)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					UPLOAD_ACTIVITY_PHOTOS(result.data.id, token, activity.photos)
						.then((photo_result) => {
							let createdActivity = { ...activity, id: result.data.id };
							let response = { OK: true, newActivity: createdActivity };

							resolve(response);
						})
						.catch((photo_error) => {
							// TODO: reupload
							// console.log(photo_error);
						});
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				// TODO: return system error message
				console.log(error);
				reject(error);
			});
	});
};

// ----------------------------------- TODO: get itinerary details ----------------------------------- //
const getDraftItineraries = (token, userId) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_DRAFT_ITINERARIES(token, userId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };
					const { content } = result.data;

					dispatch({
						type: Types.ADD_ITINERARIES,
						payload: content
					});

					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- get itinerary details ----------------------------------- //
const getDraftItineraryDetails = (token, itineraryId) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_DRAFT_ITINERARY_DETAILS(token, itineraryId)
			.then((result) => {
				console.log(result);
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, token: result.token };
					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- GET activity ----------------------------------- //
const getDraftActivityDetails = (token, itineraryId, day) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_DRAFT_ACTIVITY_DETAILS(token, itineraryId, day)
			.then((result) => {
				// console.log(result);
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, token: result.token };
					resolve(response);
				} else if (result.statusCode === 401) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					resolve(result);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export {
	createItinerary,
	createActivity,
	deleteItineraryByID,
	deleteActivityByID,
	updateItineraryByID,
	uploadCoverPhoto,
	getDraftItineraryDetails,
	getDraftActivityDetails,
	getDraftItineraries,
	publishItineraryByID
};
