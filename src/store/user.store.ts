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
}

const userStore: Module<UserState, RootState> = {
	state:{
		firebaseAuthInitialized: false,
		isAuthenticated: false,
		user: null,
		firebaseUser: null,
		rootTimers: [],
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
			state.rootTimers = timers.map(t => new TimerModel(t.label, t.intervals));
		},
		deleteTimer(state, timer: TimerModel) {
			const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
			state.rootTimers.splice(index, 1);
			timerService.updateTimers();
		},
		editTimer(state, timer: TimerModel) {
			const index = state.rootTimers.findIndex(t => t.uid === timer.uid);
			state.rootTimers.splice(index, 1, timer);
			timerService.updateTimers();
		},
		addTimer(state, timer: TimerModel | null = null) {
			state.rootTimers.push(
				timer !== null ? timer : new TimerModel(`Timer #${state.rootTimers.length+1}`),
			);
			timerService.updateTimers();
		},
	},
	actions:{
		applyRootTimers(store, timers: TimerModel[]) {
			store.commit('applyRootTimers', timers);
		},
		deleteTimer(store, timer: TimerModel) {
			store.commit('deleteTimer', timer);
		},
		editTimer(store, timer: TimerModel) {
			store.commit('editTimer', timer);
		},
		addTimer(store, timer: TimerModel | null = null) {
			store.commit('addTimer', timer);
		},
	}
};

export default userStore;