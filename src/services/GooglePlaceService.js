import axios from 'axios';
import { Constants } from '@common';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { GOOGLE_API_PARAMS, GOOGLE_API_FIELDS_NAME } = Constants.PARAMS;

const QUERY_PLACES = (input) =>
	new Promise((resolve, reject) => {
		let link = `${URL.GOOGLE_PLACE_URL}`;
		let params = `${GOOGLE_API_PARAMS.INPUT}=${input}&`;
		let key = `${GOOGLE_API_PARAMS.API_KEY}=AIzaSyBNmvhqpaxVMyWmdvnPljeALQtjL5CexwY`;

		axios
			.get(`${link}${params}${key}`)
			.then((response) => {
				const { status, predictions } = response.data;

				if (status === STATUS.OK) {
					resolve(predictions);
				} else {
					resolve([]);
				}
			})
			.catch((error) => {
				reject(error.response);
			});
	});

const GET_PLACE_DETAILS = (place_id) =>
	new Promise((resolve, reject) => {
		let link = `${URL.GOOGLE_PLACE_DETAILS_URL}`;

		let params = `${GOOGLE_API_PARAMS.PLACE_ID}=${place_id}&`;
		params += `${GOOGLE_API_PARAMS.FIELDS}=`;
		params += `${GOOGLE_API_FIELDS_NAME.NAME},`;
		params += `${GOOGLE_API_FIELDS_NAME.COMPONENT},`;
		params += `${GOOGLE_API_FIELDS_NAME.ADDRESS},`;
		params += `${GOOGLE_API_FIELDS_NAME.GEOMETRY},`;
		params += `${GOOGLE_API_FIELDS_NAME.TYPE},`;
		params += `${GOOGLE_API_FIELDS_NAME.URL}&`;

		let key = `${GOOGLE_API_PARAMS.API_KEY}=AIzaSyBNmvhqpaxVMyWmdvnPljeALQtjL5CexwY`;

		axios
			.get(`${link}${params}${key}`)
			.then((response) => {
				const { status, result } = response.data;

				if (status === STATUS.OK) {
					resolve(result);
				} else {
					reject();
				}
			})
			.catch((error) => {
				reject(error.response);
			});
	});

export { QUERY_PLACES, GET_PLACE_DETAILS };
