import firebase from 'firebase';
import store from '@/store';

export default class TimerService{
	async start(){
		console.log("Initializing Timer Service UserId: ", store.state.userState.user?.uid);
		firebase.database().ref();
	}
}
