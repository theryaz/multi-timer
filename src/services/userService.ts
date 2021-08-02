import firebase from 'firebase';
import store from '@/store';
import { Tag, UserPrefs } from '@/store/user.store';


export default class UserService{
	private userPreferencesRef: firebase.database.Reference | null = null;
	get UsersPrefsRef(): string {
		return `user/${store.state.userState.firebaseUser?.uid}/prefs`;
	}
	async start() {
		this.userPreferencesRef = firebase.database().ref(this.UsersPrefsRef);
		this.userPreferencesRef.on('value', this.userPrefsChanged.bind(this));
	}
	findTagById(id: string): Tag | undefined{
		return store.state.userState.userPrefs.tags.find(t => t.id === id) ??
					store.state.userState.userPrefs.shareTags.find(t => t.id === id);
	}

	async userPrefsChanged(snapshot: firebase.database.DataSnapshot): Promise<void>{
		const prefs = snapshot.val();
		store.commit('applyUserPrefs', prefs);
	}

	async saveUserPrefs(prefs: UserPrefs): Promise<void>{
		if(this.userPreferencesRef === null) await this.start();
		this.userPreferencesRef!.set(prefs);
	}


}
