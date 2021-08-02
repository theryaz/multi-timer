import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import store from '@/store';
import userStore from '@/store/user.store';

@Component
export class FirebaseAuthMixin extends Vue {
	async loginWithAnonymous() {
		const result = await firebase.auth().signInAnonymously()
		if (result.user){
			this.$router.push('/');
		}
	}
	async upgradeAnonymous() {
		if (!store.state.userState.firebaseUser){
			throw new Error("Firebase user is not available");
		}
		const auth = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		if (auth.user){
			if (auth.credential === null){
				throw new Error("User Auth Credential is null");
			}
			await store.state.userState.firebaseUser.linkWithCredential(auth.credential);
			this.$router.push('/');
		}
	}
	async loginWithGoogle() {
		const result = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		if(result.user){
			this.$store.commit('setFirebaseUser', result.user);
			this.$router.push('/');
		}
	}
	logout() {
		store.commit('logout');
	}
}
