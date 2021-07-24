import firebase from 'firebase';
import store from '@/store';
import { TimerModel } from '@/models/TimerModel';

export default class TimerService{
	private rootTimersRef: firebase.database.Reference | null = null;
	get UserRootTimers(): string{
		return `timers/root/${store.state.userState.user?.uid}`;
	}
	async start(){
		console.log("Initializing TimerModel Service UserId: ", store.state.userState.user?.uid);
		this.rootTimersRef = firebase.database().ref(this.UserRootTimers);
		this.rootTimersRef.on('value', this.rootTimersChanged.bind(this));
	}

	private async rootTimersChanged(snapshot: firebase.database.DataSnapshot){
		const timers = snapshot.val() || TimerService.SampleTimers;
		store.commit('applyRootTimers', timers);
	}

	static SampleTimers: TimerModel[] = [
		new TimerModel("Kiev", [
			{
				started: new Date("2021-07-24T21:07:00.000Z"),
			}
		]),
		new TimerModel("Slowcooker Running", [
			{
				started: new Date("2021-07-22T18:59:14.621Z"),
			}
		]).stop(),
	]
}
