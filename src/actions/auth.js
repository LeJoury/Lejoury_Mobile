import { Languages, Constants } from '@common';

import { LOGIN_WITH_EMAIL, REGISTER_WITH_EMAIL, REFRESH_TOKEN, LOGIN_BY_SOCIAL } from '@services';

const { STATUS } = Constants.STATUS;
const { Types } = Constants.Actions;
const { ASYNCKEY } = Constants.ASYNCKEY;

// ----------------------------------- login ----------------------------------- //
const login = (email, password) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		LOGIN_WITH_EMAIL(email, password)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { profile, token } = result.data;
					let response = { OK: true, token: token };

					dispatch({
						type: Types.LOGIN_SUCCESS,
						payload: { token: token, username: profile.username, id: profile.userId }
					});

					dispatch({
						type: Types.SETUP_PROFILE,
						payload: {
							username: profile.username,
							id: profile.userId,
							bio: profile.bio,
							photo: profile.photo,
							totalFollowers: profile.totalFollowers,
							totalFollowing: profile.totalFollowing,
							totalItineraries: profile.totalItineraries
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

const register = (username, email, password) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		REGISTER_WITH_EMAIL(username, email, password)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					let response = { OK: true };

					resolve(response);
				} else if (result.statusCode === 402) {
					let response = { OK: false, message: result.message };
					resolve(response);
				} else {
					let response = { OK: false, message: Languages.SystemError };
					resolve(response);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// ----------------------------------- refresh token ----------------------------------- //
const refreshToken = (currentToken) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		REFRESH_TOKEN(currentToken)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { profile, token } = result.data;
					let response = { OK: true, token: token };

					dispatch({
						type: Types.LOGIN_SUCCESS,
						payload: { token: token, username: profile.username, id: profile.userId }
					});

					resolve(response);
				} else {
					//invalid login
					let response = { OK: false };
					dispatch({ type: Types.LOGOUT });
					resolve(response);
				}
			})
			.catch((error) => {
				let response = { OK: false };
				dispatch({ type: Types.LOGOUT });
				reject(response);
			});
	});
};

// ----------------------------------- login by social ----------------------------------- //
const loginBySocial = (username, email, socialId, photoUrl, loginType) => async (dispatch) => {
	return new Promise((resolve, reject) => {
		LOGIN_BY_SOCIAL(username, email, socialId, photoUrl, loginType)
			.then((result) => {
				if (result.statusCode === STATUS.SUCCESS) {
					const { profile, token } = result.data;
					let response = { OK: true, token: token };
					
					dispatch({
						type: Types.LOGIN_SUCCESS,
						payload: { token: token, username: profile.username, id: profile.userId }
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

// ----------------------------------- logout ----------------------------------- //
const logout = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		let response = { OK: true };

		dispatch({ type: Types.LOGOUT });

		dispatch({ type: Types.CLEAR_PROFILE });

		resolve(response);
	});
};

export { login, register, logout, refreshToken, loginBySocial };
