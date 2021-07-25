import firebase from 'firebase';
import store from '@/store';
import { TimerModel } from '@/models/TimerModel';

const knrShare = [
	"sfLXY2hzE0VhaUksmoIXbTHWLc33",
	"Q7pYoMEponQlqGBZZqwkqw0J0U02",
];
export default class TimerService{
	private rootTimersRef: firebase.database.Reference | null = null;
	get UserRootTimers(): string{
		// Lazy way to share timers
		if(knrShare.includes(store.state.userState.firebaseUser?.uid!)){
			return `timers/knrShare`;
		}
		return `timers/root/${store.state.userState.user?.uid}`;
	}
	async start(){
		this.rootTimersRef = firebase.database().ref(this.UserRootTimers);
		this.rootTimersRef.on('value', this.rootTimersChanged.bind(this));
	}
	async updateTimers(){
		if(!this.rootTimersRef) await this.start();
		const saveTimers = store.state.userState.rootTimers.map(t => t.serialize());
		// console.log("SaveTimers", saveTimers);
		await this.rootTimersRef!.set(saveTimers);
	}

	private async rootTimersChanged(snapshot: firebase.database.DataSnapshot){
		// console.log("rootTimersChanged", JSON.stringify(snapshot.val(), null, 2));
		const timers = snapshot.val() || [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		store.commit('applyRootTimers', timers.map((t: any) => TimerModel.deserialize(t)));
	}
}
