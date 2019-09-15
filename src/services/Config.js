import axios from 'axios';
import { Constants } from '@common';

const { URL } = Constants.URL;

export default axios.create({
    baseURL: `${URL.MAIN}/api`
});
