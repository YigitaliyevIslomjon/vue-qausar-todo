// Core
import axios from 'axios'

export const baseURL = import.meta.env.VITE_BASE_URL;
const axiosParams = { baseURL }
const axiosInstance = axios.create(axiosParams)

const axiosConfig = (axiosInstance) => {
	return {
		get: (url, params) => axiosInstance.get(url, { params }),
		post: (url, body, config) => axiosInstance.post(url, body, config),
		patch: (url, body, config) => axiosInstance.patch(url, body, config),
		put: (url, body, config) => axiosInstance.put(url, body, config),
		delete: (url, config) => axiosInstance.delete(url, config),
	}
}

axiosInstance.interceptors.request.use(
	(config) => {
    config.headers = {
			Accept: 'application/json',
		}
		return config
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 200 || response.status === 201 || response.status === 204) {
            return response
		}
        else {
                throw new Error(response.status.toString())
            }
	}

)

export default axiosConfig(axiosInstance)