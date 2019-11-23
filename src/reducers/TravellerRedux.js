import { Constants } from '@common';

const { Types } = Constants.Actions;
const { Follow_Type } = Constants.Follow_Type;

const INITIAL_STATE = {
	travellers: [],
	isTravellerLastPage: false
};

const updateTravellers = (travellers, userId, action) => {
	var tmpTravellers = travellers;
	var index = tmpTravellers.findIndex((traveller) => traveller.userId === userId);

	if (index === -1) {
	} else {
		tmpTravellers[index] = { ...tmpTravellers[index], following: action === Follow_Type.FOLLOW };
	}

	return tmpTravellers;
};

export const reducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case Types.SETUP_TRAVELLERS:
			return {
				...state,
				travellers: action.payload.content,
				isTravellerLastPage: action.payload.isLastPage
			};
		case Types.UPDATE_TRAVELLERS:
			return {
				...state,
				travellers: state.travellers.concat(action.payload.content),
				isTravellerLastPage: action.payload.isLastPage
			};
		case Types.FOLLOW_TRAVELLER:
			return {
				...state,
				travellers: updateTravellers(state.travellers, action.payload.userId, Follow_Type.FOLLOW)
			};
		case Types.UNFOLLOW_TRAVELLER:
			return {
				...state,
				travellers: updateTravellers(state.travellers, action.payload.userId, Follow_Type.UNFOLLOW)
			};
		default:
			return state;
	}
};
