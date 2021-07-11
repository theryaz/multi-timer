import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import store from '@/store';

@Component
export class FirebaseAuthMixin extends Vue {
	async loginWithAnonymous({
		displayName
	}: { displayName: string }) {
		const result = await firebase.auth().signInAnonymously()
		if (result.user){
			await result.user.updateProfile({
				displayName,
			});
			this.$store.commit('setUserProfile', {
				displayName
			});
			console.log("nav to slash");
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
