import { Constants } from '@common';

const { Types } = Constants.Actions;
const { Follow_Type } = Constants.Follow_Type;

const INITIAL_STATE = {
	bio: null,
	photo: null,
	totalFollowers: null,
	totalFollowing: null,
	totalItineraries: null,
	userId: null,
	username: null,
	itineraries: [],
	following: [],
	followers: []
};

const updateList = (travellers, userId, action) => {
	var tmpList = travellers;
	var index = tmpList.findIndex((traveller) => traveller.userId === userId);

	if (index === -1) {
	} else {
		tmpList[index] = { ...tmpList[index], following: action === Follow_Type.FOLLOW };
	}

	return tmpList;
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.SETUP_PROFILE:
			return {
				...state,
				bio: action.payload.bio,
				photo: action.payload.photo,
				totalFollowers: action.payload.totalFollowers,
				totalFollowing: action.payload.totalFollowing,
				totalItineraries: action.payload.totalItineraries,
				userId: action.payload.id,
				username: action.payload.username,
				name: action.payload.name
			};
		case Types.CLEAR_PROFILE:
			return {
				...state,
				bio: null,
				photo: null,
				totalFollowers: null,
				totalFollowing: null,
				totalItineraries: null,
				userId: null,
				username: null
			};
		case Types.SETUP_PUBLISHED_ITINERARIES:
			return {
				...state,
				itineraries: action.payload
			};
		case Types.UPDATE_PROFILE:
			return {
				...state,
				bio: action.payload.bio,
				username: action.payload.username
			};
		case Types.UPDATE_PROFILE_PHOTO:
			return {
				...state,
				photo: action.payload
			};
		case Types.UPDATE_FOLLOWERS:
			return {
				...state,
				followers: action.payload
			};
		case Types.UPDATE_FOLLOWING:
			return {
				...state,
				following: action.payload
			};
		case Types.UPDATE_FOLLOWERS_LIST:
			return {
				...state,
				followers: updateList(state.followers, action.payload.userId, action.payload.type)
			};
		case Types.UPDATE_FOLLOWING_LIST:
			return {
				...state,
				following: updateList(state.following, action.payload.userId, action.payload.type)
			};
		default:
			return state;
	}
};
