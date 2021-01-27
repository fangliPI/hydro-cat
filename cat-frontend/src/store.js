import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const API_BASE = 'http://localhost:3000/api/v1'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		eval_data_basic: {},
		eval_data_details: [],
		eval_time: '',
		errorFromServer: false, // set if GET or POST failed
		loaded: false, //set if GET eval_data successfully
		uploaded: false //set if POST eval_data successfully
	},
	mutations: {
		setEvalDataBasic(state, payload) {
			state.eval_data_basic = payload;
		},
		setEvalDataDetails(state, payload) {
			state.eval_data_details = payload
		},
		setEvalTime(state, payload) {
			state.eval_time = payload
		},
		setError(state, payload) {
			state.errorFromServer = payload;
		},
		setLoaded(state, payload) {
			state.loaded = payload;
		},
		setUploaded(state, payload) {
			state.uploaded = payload;
		}
	},
	actions: {
		getData({
			commit
		}) {
			axios.get(`${API_BASE}/eval_data_latest`).then(response => {
					//console.log(response.data);
					commit('setEvalDataBasic', response.data.basic_info);
					commit('setEvalDataDetails', response.data.details);
					commit('setEvalTime', response.data.createdAt);
					commit('setLoaded', true);
					commit('setError', false);
				})
				.catch((error) => {
					console.log(error);
					commit('setError', true);
					commit('setLoaded', false);
				})
		},
		async postData({
			commit
		}, payload) {
			axios.post(`${API_BASE}/eval_data`, payload).then(response => {
					//console.log('uploaded data:', response.data);
					commit('setUploaded', true);
					commit('setError', false);
				})
				.catch((error) => {
					console.log(error);
					commit('setError', true);
					commit('setUploaded', false);
				})
		},
		updateBasic({
			commit
		}, payload) {
			commit('setEvalDataBasic', payload);
		},
		updateDetails({
			commit
		}, payload) {
			commit('setEvalDataDetails', payload);
		}
	}
})
