import firebase from 'firebase';
import { NavigationGuard } from 'vue-router';
import store from '@/store';


export const authGuard: NavigationGuard = async (to, _, next) => {
	if(to.name === 'Login') return next();
	if (store.state.userState.isAuthenticated){
		return next();
	}
	const user = await new Promise((resolve) => {
		if(firebase.auth().currentUser) return firebase.auth().currentUser;
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, () => resolve(null));
	});
	if (user !== null){
		return next();
	}
	return next({
		name: 'Login'
	});
}