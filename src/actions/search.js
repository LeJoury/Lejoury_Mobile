import base from '../services/Config';
import { Constants } from '@common';

const { Types } = Constants.Actions;
const { URL } = Constants.URL;

// ------------------------------- set search ----------------------------------- //
const setSearch = (isSearch) => (dispatch) => {
	dispatch({ type: Types.SET_SEARCH, payload: isSearch });
};

export { setSearch };
