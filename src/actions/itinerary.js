import { Languages, Constants } from '@common';

import {
	CREATE_ITINERARY,
	CREATE_ACTIVITY,
	DELETE_ITINERARY_BY_ID,
	DELETE_ACTIVITY_BY_ID,
	DELETE_ACTIVITY_PHOTO_BY_PHOTO_ID,
	UPDATE_ITINERARY_BY_ID,
	PUBLISH_ITINERARY_BY_ID,
	UPLOAD_COVER_PHOTO,
	UPLOAD_ACTIVITY_PHOTOS,
	UPDATE_ACTIVITY,
	GET_DRAFT_ITINERARY_DETAILS,
	GET_DRAFT_ITINERARIES,
	GET_DRAFT_ACTIVITY_DETAILS,
	GET_PUBLISHED_ITINERARIES,
	GET_COUNTRIES,
	GET_PUBLISHED_ITINERARY_DETAILS,
	GET_BOOKMARKS,
	BOOKMARK
} from '@services';

const { STATUS } = Constants.STATUS;
const { Types } = Constants.Actions;
const { Action } = Constants.Action;
const { Bucket_Type } = Constants.Bucket_Type;

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
	return new Promise((resolve, reject) => {
		UPDATE_ITINERARY_BY_ID(itineraryId, itinerary, token, userId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

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

// ----------------------------------- get itinerary by id ----------------------------------- //
const getItineraryById = (token, itineraryId) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_PUBLISHED_ITINERARY_DETAILS(token, itineraryId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, itinerary: result.data };

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
							let createdActivity = { ...activity, id: result.data.id, photos: photo_result.data };
							let response = { OK: true, newActivity: createdActivity };

							// console.log(response);
							resolve(response);
						})
						.catch((photo_error) => {
							// TODO: reupload
							console.log(photo_error);
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

// ----------------------------------- create activity ----------------------------------- //
const updateActivity = (activityId, activity, token, itineraryId, date, identifier) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		UPDATE_ACTIVITY(activityId, activity, token, itineraryId, date, identifier)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					UPLOAD_ACTIVITY_PHOTOS(activityId, token, activity.photos)
						.then((photo_result) => {
							let createdActivity = { ...activity, id: activityId, photos: photo_result.data };
							let response = { OK: true, newActivity: createdActivity };

							// console.log(response);
							resolve(response);
						})
						.catch((photo_error) => {
							// TODO: reupload
							console.log(photo_error);
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

// ----------------------------------- delete photos ----------------------------------- //
const deleteActivityPhoto = (photoId, activityId, itineraryId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		DELETE_ACTIVITY_PHOTO_BY_PHOTO_ID(photoId, token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.REMOVE_PHOTO,
						payload: {
							activityId,
							itineraryId,
							photoId
						}
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
				// TODO: return system error message
				console.log(error);
				reject(error);
			});
	});
};

// ----------------------------------- get draft itineraries ----------------------------------- //
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

// ----------------------------------- get draft itinerary details ----------------------------------- //
const getDraftItineraryDetails = (token, itineraryId) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_DRAFT_ITINERARY_DETAILS(token, itineraryId)
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

// ----------------------------------- get draft activity ----------------------------------- //
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

// ----------------------------------- get published itinerary ----------------------------------- //
const getPublishedItineraries = (token, userId, isMe = true) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_PUBLISHED_ITINERARIES(token, userId)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					if (isMe) {
						let response = { OK: true };
						const { content } = result.data;
						dispatch({
							type: Types.SETUP_PUBLISHED_ITINERARIES,
							payload: content
						});

						resolve(response);
					} else {
						const { content } = result.data;

						// console.log(content);

						let response = { OK: true, itineraries: content };
						resolve(response);
					}
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

// ----------------------------------- get country list ----------------------------------- //
const getCountryList = (token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_COUNTRIES(token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { content } = result.data;

					let response = { OK: true, countries: content };
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

// ----------------------------------- add bookmark ----------------------------------- //
const addBookmark = (token, id, type) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		BOOKMARK(token, id, type, Action.ADD)
			.then((result) => {
				// console.log(result);
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

// ----------------------------------- remove bookmark ----------------------------------- //
const removeBookmark = (token, id, type) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		BOOKMARK(token, id, type, Action.REMOVE)
			.then((result) => {
				// console.log(result);
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

// ----------------------------------- get Activity bookmark ----------------------------------- //
const getActivityBookmark = (token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_BOOKMARKS(token, Bucket_Type.ACTIVITY)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { content } = result.data;
					console.log(content);

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

// ----------------------------------- get Itinerary bookmark ----------------------------------- //
const getItineraryBookmark = (token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_BOOKMARKS(token, Bucket_Type.ITINERARY)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { content } = result.data;
					console.log(content);

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

export {
	createItinerary,
	createActivity,
	deleteItineraryByID,
	deleteActivityByID,
	deleteActivityPhoto,
	updateItineraryByID,
	uploadCoverPhoto,
	updateActivity,
	publishItineraryByID,
	getDraftItineraryDetails,
	getDraftActivityDetails,
	getDraftItineraries,
	getPublishedItineraries,
	getCountryList,
	getItineraryById,
	addBookmark,
	removeBookmark,
	getActivityBookmark,
	getItineraryBookmark
};
