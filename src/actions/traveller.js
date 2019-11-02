import { Languages, Constants } from '@common';

import {
	GET_TRAVELLERS,
	GET_TRAVELLER_PROFILE,
	GET_TRAVELLER_FOLLOWERS,
	GET_TRAVELLER_FOLLOWING,
	FOLLOW_NEW_TRAVELLER,
	LIKE_NEW_ITINERARY,
	UPLOAD_PROFILE_PHOTO,
	EDIT_PROFILE
} from '@services';

const { STATUS } = Constants.STATUS;
const { Types } = Constants.Actions;
const { Follow_Type } = Constants.Follow_Type;
const { ASYNCKEY } = Constants.ASYNCKEY;

// -----------------------------  get profile ----------------------------------- //
const getProfile = (travellerId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_TRAVELLER_PROFILE(travellerId, token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					const { data } = result;

					// console.log(data);
					dispatch({
						type: Types.SETUP_PROFILE,
						payload: {
							username: data.username,
							id: data.userId,
							bio: data.bio,
							photo: data.photo,
							name: data.name,
							totalFollowers: data.totalFollowers,
							totalFollowing: data.totalFollowing,
							totalItineraries: data.totalItineraries
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
				reject(error);
			});
	});
};

// -----------------------------  get followers ----------------------------------- //
const getFollowers = (token, page = 1) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_TRAVELLER_FOLLOWERS(token, page)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.UPDATE_FOLLOWERS,
						payload: result.data.content
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

// -----------------------------  get following ----------------------------------- //
const getFollowing = (token, page = 1) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_TRAVELLER_FOLLOWING(token, page)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.UPDATE_FOLLOWING,
						payload: result.data.content
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

// -----------------------------  follow traveller ----------------------------------- //
const followTraveller = (token, travellerId, type, from = 'none') => async (dispatch) => {
	return new Promise((resolve, reject) => {
		FOLLOW_NEW_TRAVELLER(token, travellerId, type)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: type === Follow_Type.FOLLOW ? Types.FOLLOW_TRAVELLER : Types.UNFOLLOW_TRAVELLER,
						payload: { userId: travellerId }
					});

					if (from === 'FollowingList') {
						console.log(type);
						dispatch({
							type: Types.UPDATE_FOLLOWING_LIST,
							payload: { userId: travellerId, type: type }
						});
					} else if (from === 'FollowerList') {
						dispatch({
							type: Types.UPDATE_FOLLOWERS_LIST,
							payload: { userId: travellerId, type: type }
						});
					}

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

// -----------------------------  like itinerary ----------------------------------- //
const likeItinerary = (token, itineraryId, type) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		LIKE_NEW_ITINERARY(token, itineraryId, type)
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

// -----------------------------  like itinerary ----------------------------------- //
const uploadProfilePhoto = (token, photo) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		UPLOAD_PROFILE_PHOTO(token, photo)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.UPDATE_PROFILE_PHOTO,
						payload: result.data.photo
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

// -----------------------------  edit profile ----------------------------------- //
const editProfile = (token, profile) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		EDIT_PROFILE(token, profile)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.UPDATE_PROFILE,
						payload: profile
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

// -----------------------------  get all travellers ----------------------------------- //
const getTravellers = (token, page) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_TRAVELLERS(token, page)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					dispatch({
						type: Types.SETUP_TRAVELLERS,
						payload: result.data.content
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

const getTravellerProfile = (travellerId, token) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		GET_TRAVELLER_PROFILE(travellerId, token)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true, user: result.data };
					// console.log(response);
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
	getTravellers,
	getTravellerProfile,
	getProfile,
	getFollowers,
	getFollowing,
	followTraveller,
	likeItinerary,
	uploadProfilePhoto,
	editProfile
};
