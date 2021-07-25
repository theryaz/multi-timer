import { randomString } from '@/helpers/random';

export type TimerState = "running" | "stopped" | "paused";

export type TimerInterval = {
	started: Date;
	stopped?: Date;
};

export class TimerModel{
	public uid: string;
	public label: string;
	public intervals: TimerInterval[] = [];
	/** Timer requires prompt to be modified */
	public protected: boolean = false;

	get state(): TimerState{
		if(this.intervals.length === 0) return "stopped";
		if(this.LastInterval.stopped === undefined) return "running";
		return "paused";
	}
	get FirstInterval(): TimerInterval{
		return this.intervals[0];
	}
	get LastInterval(): TimerInterval{
		return this.intervals[this.intervals.length - 1];
	}

	setStart(date: Date): this{
		if(this.FirstInterval.started < date){
			return this;
		}
		this.FirstInterval.started = date;
		return this;
	}

	get IsRunning(): boolean{
		return this.state === "running";
	}
	get IsPaused(): boolean{
		return this.state === "paused";
	}
	get IsStopped(): boolean{
		return this.state === "stopped";
	}
	
	constructor(label: string, intervals: TimerInterval[] = []){
		this.uid = randomString(24);
		this.label = label;
		this.intervals = intervals;
	}

	start(time?: Date): TimerModel{
		if(this.IsRunning) return this;
		const interval = {
			started: time !== undefined ? time : new Date(),
		};
		this.intervals.push(interval);
		return this;
	}
	stop(): TimerModel{
		if(!this.IsRunning) return this;
		this.LastInterval.stopped = new Date();
		return this;
	}
	reset(): TimerModel{
		this.intervals = [];
		return this;
	}

	/** Returns miliseconds since timer started */
	get TimeMS(): number{
		const timeMs = this.intervals.reduce((a,b) => {
			return a + TimerModel.getIntervalMs(b);
		}, 0);
		return timeMs;
	}
	/** Returns Seconds since timer started */
	get TimeS(): number{
		return ~~(this.TimeMS/1000)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static deserialize(timer: Record<string,any>): TimerModel{
		const t = new TimerModel(
			(timer.label as string),
			timer.intervals ? (timer.intervals as Record<string,string>[])
				.map((i: Record<string,string>) => ({
					started: new Date(i.started),
					stopped: i.stopped ? new Date(i.stopped) : undefined,
				})): undefined
		);
		t.uid = timer.uid;
		t.protected = timer.protected;
		return t;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	serialize(): Record<string, any>{
		return {
			...this,
			intervals: this.intervals.map(i => {
				if(i.stopped === undefined){
					return {
						started: i.started.toISOString(),
					}
				}
				return{
					started: i.started.toISOString(),
					stopped: i.stopped.toISOString(),
				}
			})
		}
	}

	static getIntervalMs(interval: TimerInterval): number{
		if(interval.stopped === undefined){
			return Date.now() - +interval.started;
		}
		return +interval.stopped - +interval.started;
	}

	static FormatTime(miliseconds: number): string{
		const seconds = Math.floor((miliseconds / 1000) % 60);
		const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
		const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
		const days = Math.floor((miliseconds / (1000 * 60 * 60 * 24)));
		return (
			(days > 0 ? days + ':' : '') +
			(hours > 0 ? TimerModel.zeroPad(hours) + ':' : '') +
			(minutes > 0 ? TimerModel.zeroPad(minutes) + ':' : '00:') +
			(seconds > 0 ? TimerModel.zeroPad(seconds) : '00') +
			`${days > 0 ? 'd' : hours > 0 ? 'h' : ''}`
		)
	}

	static zeroPad(s: string | number): string{
		return `0${s}`.slice(-2);
	}

}