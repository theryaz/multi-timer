import { Module } from 'vuex';
import firebase from 'firebase';
import { User } from '@/models/User';
import { RootState } from './RootState';
import router from '@/router';

export interface UserState{
	firebaseAuthInitialized: boolean;
	isAuthenticated: boolean;
	user: User | null;
	firebaseUser: firebase.User | null;
}

const userStore: Module<UserState, RootState> = {
	state:{
		firebaseAuthInitialized: false,
		isAuthenticated: false,
		user: null,
		firebaseUser: null,
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
		}
	},
};

export default userStore;