import firebase from 'firebase';
import store from '@/store';
import { Tag, UserPrefs } from '@/store/user.store';
import { TimerModel } from '@/models/TimerModel';

const knrShare = [
	"sfLXY2hzE0VhaUksmoIXbTHWLc33",
	"Q7pYoMEponQlqGBZZqwkqw0J0U02",
];
export default class TimerService{
	private rootTimersRef: firebase.database.Reference | null = null;
	private timerTagRefs: Record<string, firebase.database.Reference> = {};
	get UserPrefs(): UserPrefs{
		return store.state.userState.userPrefs;
	}
	get UserRootTimers(): string{
		// Lazy way to share timers
		if(knrShare.includes(store.state.userState.firebaseUser?.uid!)){
			return `timers/knrShare`;
		}
		return `timers/root/${store.state.userState.user?.uid}`;
	}
	getTagRef(tag: Tag): string{
		const tagRef = store.state.userState.userPrefs.tags.find(t => t.id === tag.id);
		const sharedTagRef = store.state.userState.userPrefs.tags.find(t => t.id === tag.id);
		if(tagRef !== undefined){
			return `timers/${tagRef.id}`;
		} else if (sharedTagRef !== undefined){
			return `timers/${sharedTagRef.id}`;
		}
		return `timers/${tag.id}`;
	}
	async start(){
		this.rootTimersRef = firebase.database().ref(this.UserRootTimers);
		this.rootTimersRef.on('value', this.rootTimersChanged.bind(this));
	}
	async startTagRef(tag: Tag){
		const tagRef = this.getTagRef(tag);
		if(tagRef === null) return;
		this.timerTagRefs[tag.id] = firebase.database().ref(tagRef);
		this.timerTagRefs[tag.id].on('value', (snapshot) => this.tagTimersChanged(tag.id, snapshot));
	}
	async stopTagRef(tag: Tag){
		if (this.timerTagRefs[tag.id] === undefined) return;
		this.timerTagRefs[tag.id].off();
	}

	get OpenTagRefs(): [string, firebase.database.Reference][]{
		return Object.entries(this.timerTagRefs);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	serializeTagTimers(tagId: string): Record<string,any>[]{
		if(this.timerTagRefs[tagId] === undefined) return [];
		return store.state.userState.timers[tagId].map(t => t.serialize());
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

	private async tagTimersChanged(tagId: string, snapshot: firebase.database.DataSnapshot){
		// console.log("tagTimersChanged", JSON.stringify(snapshot.val(), null, 2));
		const timers = snapshot.val() || [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		store.commit('applyTagTimers', { id: tagId, timers: timers.map((t: any) => TimerModel.deserialize(t))});
	}
}
