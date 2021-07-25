import firebase from 'firebase';
import store from '@/store';
import { TimerModel } from '@/models/TimerModel';

const knrShare = [
	"sfLXY2hzE0VhaUksmoIXbTHWLc33",
	"Q7pYoMEponQlqGBZZqwkqw0J0U02",
];
export default class TimerService{
	private rootTimersRef: firebase.database.Reference | null = null;
	private timerTagRefs: Record<string, firebase.database.Reference> = {};
	get UserRootTimers(): string{
		// Lazy way to share timers
		if(knrShare.includes(store.state.userState.firebaseUser?.uid!)){
			return `timers/knrShare`;
		}
		return `timers/root/${store.state.userState.user?.uid}`;
	}
	getTagRef(tag: string): string{
		return `timers/${tag}`;
	}
	async start(){
		this.rootTimersRef = firebase.database().ref(this.UserRootTimers);
		this.rootTimersRef.on('value', this.rootTimersChanged.bind(this));
	}
	async startTagRef(tag: string){
		if (this.timerTagRefs[tag] !== undefined) return;
		console.log("startTagRef...", tag);
		this.timerTagRefs[tag] = firebase.database().ref(this.getTagRef(tag));
		this.timerTagRefs[tag].on('value', (snapshot) => this.tagTimersChanged(tag, snapshot));
	}
	async stopTagRef(tag: string){
		if (this.timerTagRefs['tag'] === undefined) return;
		this.timerTagRefs[tag].off();
	}

	get OpenTagRefs(): [string, firebase.database.Reference][]{
		return Object.entries(this.timerTagRefs);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	serializeTagTimers(tag: string): Record<string,any>[]{
		if(this.timerTagRefs[tag] === undefined) return [];
		return store.state.userState.timers[tag].map(t => t.serialize());
	}
	async updateTimers(){
		const ops: Promise<unknown>[] = [];
		if(this.rootTimersRef){
			const saveTimers = store.state.userState.rootTimers.map(t => t.serialize());
			ops.push(this.rootTimersRef!.set(saveTimers));
		}
		for (const [tag, ref] of this.OpenTagRefs){
			const tagTimers = this.serializeTagTimers(tag);
			ops.push(ref.set(tagTimers));
		}
		await Promise.allSettled(ops);
	}

	private async rootTimersChanged(snapshot: firebase.database.DataSnapshot){
		// console.log("rootTimersChanged", JSON.stringify(snapshot.val(), null, 2));
		const timers = snapshot.val() || [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		store.commit('applyRootTimers', timers.map((t: any) => TimerModel.deserialize(t)));
	}

	private async tagTimersChanged(tag: string, snapshot: firebase.database.DataSnapshot){
		// console.log("tagTimersChanged", JSON.stringify(snapshot.val(), null, 2));
		const timers = snapshot.val() || [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		store.commit('applyTagTimers', {tag, timers: timers.map((t: any) => TimerModel.deserialize(t))});
	}
}
