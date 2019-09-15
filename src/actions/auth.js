import base from '../services/Config';
import { Constants } from '@common';

const { Types } = Constants.Actions;
const { URL } = Constants.URL;

// ----------------------------------- login ----------------------------------- //
const login = (username, password) => async (dispatch) => {
	dispatch({ type: Types.LOGIN });

	let params = JSON.stringify({
		username,
		password
	});

	try {
		const response = await base.post(`${URL.URL_AUTH}/${URL.URL_TOKEN}`, params, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			dispatch({
				type: Types.LOGIN_SUCCESS,
				payload: response.data
			});
		}
	} catch (error) {
		if (error.response.status === 401) {
			console.log(error.response.data.message);
			dispatch({
				type: Types.LOGIN_FAIL,
				payload: error.response.data.message
			});
		} else {
			console.log(error);
			dispatch({
				type: Types.LOGIN_FAIL,
				payload: ''
			});
		}
	}
};

// ----------------------------------- logout ----------------------------------- //
const logout = () => (dispatch) => {
	dispatch({ type: Types.LOGOUT });
};

// ----------------------------- dismiss dialog ----------------------------------- //
const dismissLoginDialog = () => (dispatch) => {
	dispatch({ type: Types.DISMISS_LOGIN_DIALOG });
};

// ----------------------------------- refresh token ----------------------------------- //
const refreshToken = (token) => async (dispatch) => {
	dispatch({ type: Types.TOKEN_REFRESH });

	try {
		const response = await base.get(`${URL.URL_AUTH}/${URL.URL_REFRESH_TOKEN}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		if (response.status === 200) {
			dispatch({
				type: Types.TOKEN_REFRESH_SUCCESS,
				payload: response.data
			});
		}
	} catch (error) {
		if (error.response.status === 401) {
			console.log(error.response.data.message);

			dispatch({
				type: Types.TOKEN_REFRESH_FAIL,
				payload: error.response.data.message
			});
		} else {
			dispatch({
				type: Types.TOKEN_REFRESH_FAIL,
				payload: ''
			});
		}
		// console.log(error);
	}
};

// ----------------------------------- reset token ----------------------------------- //
const resetToken = (token, name = '') => (dispatch) => {
	if (name === '') {
		dispatch({
			type: Types.TOKEN_RESET,
			payload: token
		});
	}else {
		let payload = {
			token,
			name
		}

		dispatch({
			type: Types.TOKEN_NAME_RESET,
			payload: payload
		});
	}
};

export { login, logout, refreshToken, dismissLoginDialog, resetToken };
