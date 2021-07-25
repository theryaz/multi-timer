import Vue from 'vue';
import { Module } from 'vuex';
import firebase from 'firebase';
import { User } from '@/models/User';
import { RootState } from './RootState';
import router from '@/router';
import { TimerModel } from '@/models/TimerModel';
import { timerService } from '@/services';

export interface UserState{
	firebaseAuthInitialized: boolean;
	isAuthenticated: boolean;
	user: User | null;
	firebaseUser: firebase.User | null;
	rootTimers: TimerModel[];
	timers: Record<string, TimerModel[]>;
}

const userStore: Module<UserState, RootState> = {
	state:{
		firebaseAuthInitialized: false,
		isAuthenticated: false,
		user: null,
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
		applyRootTimers(state, timers: TimerModel[]) {
			state.rootTimers = timers.map(t => TimerModel.deserialize(t));
		},
		applyTagTimers(state, { tag, timers }: { tag: string; timers: TimerModel[] }) {
			Vue.set(state.timers, tag, timers.map(t => TimerModel.deserialize(t)));
		},
		deleteTimer(state, { tag, timer }: {tag: string; timer: TimerModel}) {
			if (tag === undefined) {
				const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
				state.rootTimers.splice(index, 1);
			}else{
				if (!Array.isArray(state.timers[tag])) Vue.set(state.timers, tag, []);
				const index = state.timers[tag].findIndex(t => t.uid === timer.uid);
				state.timers[tag].splice(index, 1);
			}
			timerService.updateTimers();
		},
		editTimer(state, { tag, timer }: {tag: string; timer: TimerModel}) {
			if(tag === undefined){
				const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
				state.rootTimers.splice(index, 1, timer);
			}else{
				if (!Array.isArray(state.timers[tag])) Vue.set(state.timers, tag, []);
				const index = state.timers[tag].findIndex(t => t.uid === timer.uid);
				state.timers[tag].splice(index, 1, timer);
			}
			timerService.updateTimers();
		},
		addTimer(state, {tag,timer = null}: {tag?: string; timer: TimerModel | null}) {
			if (tag === undefined){
				state.rootTimers.push(
					timer !== null ? timer : new TimerModel(`Timer #${state.rootTimers.length+1}`),
				);
			}else{
				if (!Array.isArray(state.timers[tag])) Vue.set(state.timers, tag, []);
				state.timers[tag].push(
					timer !== null ? timer : new TimerModel(`Timer #${state.timers[tag].length+1}`),
				);
			}
			timerService.updateTimers();
		},
	},
	actions:{
		applyRootTimers(store, timers: TimerModel[]) {
			store.commit('applyRootTimers', timers);
		},
		deleteTimer(store, payload: {tag: string;timer: TimerModel}) {
			store.commit('deleteTimer', payload);
		},
		editTimer(store, payload: {tag: string;timer: TimerModel}) {
			store.commit('editTimer', payload);
		},
		addTimer(store, payload: {tag: string;timer: TimerModel} | null = null) {
			store.commit('addTimer', payload);
		},
	}
};

export default userStore;