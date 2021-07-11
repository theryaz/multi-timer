import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import { User } from '@/models/User';

@Component
export class CurrentUserMixin extends Vue {

	get IsAdmin(): boolean{
		return [
			"8WeTliWt9YbtGjHaCs1mjTInYis2", // Krista
			"RxPwondkUBMK8i7qX15NJ8wwEA73" // Ryan
		].includes(this.MyUserId!);
	}

	get MyUserId(): string | null {
		if (!store.state.userState.user) return null;
		return store.state.userState.user.uid;
	}
	get MyUser(): User | null {
		if (!store.state.userState.user) return null;
		return store.state.userState.user;
	}
}
