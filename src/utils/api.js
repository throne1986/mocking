import React from 'react';
import axios from 'axios';
import qs from 'qs';

export const instance = axios.create({
	baseURL: '/api/v1/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
	},
});

instance.interceptors.request.use(config => {
	if (config.data && config.data instanceof FormData && config.data.get('ContentType')) {
		config.headers['Content-Type'] = config.data.get('ContentType');
	}

	return config;
}, (err) => Promise.reject(err));

instance.interceptors.response.use((response) => {
	response.success = true;
	return response;
}, (err) => {
	if (err) {
		const response = err.response;
		const title = response.data.title;
		let message = response.data.message;

		if (response.status !== 422) {
			alert.fire({
				showConfirmButton: false,
				cancelButtonText: 'Ok',
				title: title || 'Something went wrong.',
				text: message,
			});
		}

		if (response.status === 401) {
			window.location = '/';
		}
	}

	return Promise.reject(err.response);
});

export async function get(url, params) {
	const query = (params) ? `?${qs.stringify(params)}` : '';
	const response = await instance({
		method: 'GET',
		url: `${url}${query}`
	})

	return response
}

export async function post(url, data) {
	const response = await instance({
		method: 'POST',
		url,
		data
	});

	return response;
}

export async function put(url, data) {
	const response = await instance({
		method: 'PUT',
		url,
		data
	});

	return response;
}

export async function patch(url, data) {
	const response = await instance({
		method: 'PATCH',
		url,
		data
	});

	return response;
}

export async function del(url) {
	const response = await instance({
		method: 'DELETE',
		url
	});

	return response;
}

export async function upload(url, data, config) {
	const response = await instance({
		method: 'POST',
		url,
		data: data.formData,
		...config
	});


	return response;
}

export const catchErrors = (errors, field) => {
	const data = errors.filter(e => e[0] === field);
	if (data[0] && data[0][1]) {
		return data[0][1].map(e => <div key={`e-${e}`} className="srv-validation-message">{e}</div>)
	}
}

export async function createJsonFromVideo(video, user) {
	const jsonResponse = await get('/json_movie');
	const sceneResponse = await get('/json_scene');
	const json = jsonResponse.data;
	const scene = sceneResponse.data;

	json.hid = '';
	json.user_id = user.id;
	scene.duration = parseFloat(video.duration);
	scene.background = {
		...scene.background,
		"src": video.watermark,
		"endtime": parseFloat(video.duration),
		"videoid": video.id,
		"nativeduration": parseFloat(video.duration)
	};
	json.data.scenes.push(scene);

	return JSON.stringify(json);
}

export async function createJsonFromScene(scene, user) {
	const jsonResponse = await get('/json_scene');
	const json = jsonResponse.data;

	json.data.scenes.push(scene);
	json.user_id = user.id

	return JSON.stringify(json);
}