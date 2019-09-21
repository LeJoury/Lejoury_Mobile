import { Constants } from '@common';

const { Types } = Constants.Actions;

// ----------------------------------- update internet connection ----------------------------------- //
const updateConnectionStatus = (isConnected) => (dispatch) => {
	dispatch({
		type: Types.UPDATE_CONNECTION_STATUS,
		payload: isConnected
	});
};

export { updateConnectionStatus };
