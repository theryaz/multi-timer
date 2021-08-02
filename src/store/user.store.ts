import Vue from 'vue';
import { Module } from 'vuex';
import firebase from 'firebase';
import { User } from '@/models/User';
import { RootState } from './RootState';
import router from '@/router';
import { TimerModel } from '@/models/TimerModel';
import { timerService, userService } from '@/services';
import { randomString } from '@/helpers/random';

export interface UserState{
	firebaseAuthInitialized: boolean;
	isAuthenticated: boolean;
	user: User | null;
	userPrefs: UserPrefs;
	firebaseUser: firebase.User | null;
	rootTimers: TimerModel[];
	timers: Record<string, TimerModel[]>;
}

export type Tag = {
	label: string;
	id: string;
}

export interface UserPrefs{
	darkMode?: boolean;
	tags: Tag[];
	/** Tags shared with user */
	shareTags: Tag[];
}

const userStore: Module<UserState, RootState> = {
	state:{
		firebaseAuthInitialized: false,
		isAuthenticated: false,
		user: null,
		userPrefs: {
			tags: [],
			shareTags: [],
		},
		firebaseUser: null,
		rootTimers: [],
		timers: {},
	},
	mutations:{
		setFirebaseUser(state, user: firebase.User){
			state.isAuthenticated = true;
			state.user = new User({
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				providerId: user.providerId,
				isAnonymous: user.isAnonymous,
			});
			state.firebaseUser = user;
		},
		setUserProfile(state, user: Partial<User>){
			state.user = new User({
				...state.user,
				...user
			} as User);
		},
		firebaseAuthInitialized(state){
			state.firebaseAuthInitialized = true;
		},
		logout(state){
			state.isAuthenticated = false;
			state.user = null;
			firebase.auth().signOut();
			router.push('/login');
		},
		saveUserPrefs(state, prefs: UserPrefs) {
			state.userPrefs = prefs;
			userService.saveUserPrefs(prefs);
		},
		addTag(state, {label}: {label: string}) {
			state.userPrefs.tags.push({
				label,
				id: randomString(36),
			});
			userService.saveUserPrefs(state.userPrefs);
		},
		removeTag(state, {id}: {id: string}) {
			const index = state.userPrefs.tags.findIndex(t => t.id === id);
			if(index > -1){
				state.userPrefs.tags.splice(index, 1);
				userService.saveUserPrefs(state.userPrefs);
			}
		},
		applyUserPrefs(state, prefs: UserPrefs) {
			state.userPrefs.darkMode = prefs.darkMode ?? false;
			state.userPrefs.tags = prefs.tags ?? [];
			state.userPrefs.shareTags = prefs.shareTags ?? [];
		},
		applyRootTimers(state, timers: TimerModel[]) {
			state.rootTimers = timers.map(t => TimerModel.deserialize(t));
		},
		applyTagTimers(state, { id, timers }: { id: string; timers: TimerModel[] }) {
			Vue.set(state.timers, id, timers.map(t => TimerModel.deserialize(t)));
		},
		deleteTimer(state, { id, timer }: {id: string; timer: TimerModel}) {
			if (id === undefined) {
				const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
				state.rootTimers.splice(index, 1);
			}else{
				if (!Array.isArray(state.timers[id])) Vue.set(state.timers, id, []);
				const index = state.timers[id].findIndex(t => t.uid === timer.uid);
				state.timers[id].splice(index, 1);
			}
			timerService.updateTimers();
		},
		editTimer(state, { id, timer }: {id: string; timer: TimerModel}) {
			if(id === undefined){
				const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
				state.rootTimers.splice(index, 1, timer);
			}else{
				if (!Array.isArray(state.timers[id])) Vue.set(state.timers, id, []);
				const index = state.timers[id].findIndex(t => t.uid === timer.uid);
				state.timers[id].splice(index, 1, timer);
			}
			timerService.updateTimers();
		},
		addTimer(state, {id,timer = null}: {id?: string; timer: TimerModel | null}) {
			if (id === undefined){
				state.rootTimers.push(
					timer !== null ? timer : new TimerModel(`Timer #${state.rootTimers.length+1}`),
				);
			}else{
				if (!Array.isArray(state.timers[id])) Vue.set(state.timers, id, []);
				state.timers[id].push(
					timer !== null ? timer : new TimerModel(`Timer #${state.timers[id].length+1}`),
				);
			}
			timerService.updateTimers();
		},
	},
	actions:{
		applyRootTimers(store, timers: TimerModel[]) {
			store.commit('applyRootTimers', timers);
		},
		deleteTimer(store, payload: {id: string;timer: TimerModel}) {
			store.commit('deleteTimer', payload);
		},
		editTimer(store, payload: {id: string;timer: TimerModel}) {
			store.commit('editTimer', payload);
		},
		addTimer(store, payload: {id: string;timer: TimerModel} | null = null) {
			store.commit('addTimer', payload);
		},
		saveUserPrefs(store, prefs: UserPrefs) {
			store.commit('saveUserPrefs', prefs);
		},
		addTag(store, payload: { id: string }) {
			store.commit('addTag', payload);
		},
		removeTag(store, payload: { id: string }) {
			store.commit('removeTag', payload);
		},
	}
};

export default userStore;