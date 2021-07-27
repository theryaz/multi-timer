<template>
	<v-card flat outlined>
		<div class="text-right pt-2 pr-2">
			<v-btn icon @click="edit">
				<v-icon class="mx-1">
					mdi-pencil
				</v-icon>
			</v-btn>
			<v-btn icon @click="deleteTimer">
				<v-icon class="mx-1">
					mdi-trash-can-outline
				</v-icon>
			</v-btn>
		</div>
		<div v-if="TimerProtected" class="position-relative">
			<div class="protected-icon-position text-center">
				<v-icon size="24" class="protected-icon ml-n3 text--disabled">
					mdi-lock
				</v-icon>
			</div>
		</div>
		<v-card-text class="text-center">
			{{ timer.label }}
			<div class="pa-1 time text-h4 text-center">
				{{ format(TimeMS) }}
			</div>
		</v-card-text>
		<v-card-actions class="d-flex">
			<v-btn color="accent" v-if="timer.IsRunning" class="flex-grow-1" elevation="0" @click="stop">
				<v-icon>
					mdi-pause
				</v-icon>
			</v-btn>
			<template v-else>
				<v-btn outlined color="accent" class="flex-grow-1" elevation="0" @click="reset">
					<v-icon>
						mdi-refresh
					</v-icon>
				</v-btn>
				<v-btn color="accent" class="flex-grow-1" elevation="0" @click="start">
					<v-icon>
						mdi-play
					</v-icon>
				</v-btn>
			</template>
			<v-dialog max-width="600" v-model="showConfirm">
				<v-card class="py-6 px-4s">
					<v-card-text>
						{{ confirmText }}
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn color="accent" large outlined @click="cancelConfirm">
							Cancel
						</v-btn>
						<v-btn color="accent" class="black--text" large v-if="confirmAction === 'start'" @click="start(true)">
							Start
						</v-btn>
						<v-btn color="accent" class="black--text" large v-else-if="confirmAction === 'stop'" @click="stop(true)">
							Stop
						</v-btn>
						<v-btn color="accent" class="black--text" large v-if="confirmAction === 'reset'" @click="reset(true)">
							Reset
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { TimerModel } from '@/models/TimerModel';

@Component
export default class Timer extends Mixins(VuetifyMixin) {
	@Prop({ required: true }) timer!: TimerModel;

	get TimerProtected(): boolean{
		return this.Timer.isProtected;
	}
	get Timer(): TimerModel{
		return this.timer;
	}
	get TimeMS(): number{
		this.tick; this.internalTick;
		return this.timer.TimeMS;
	}

	format = TimerModel.FormatTime;

	interval: number | null = null;
	@Prop({ default: null }) tick!: number | null;
	internalTick: number = 0;
	created(): void{
		if(this.tick === null){
			this.interval = setInterval(() => this.internalTick++, 1000);
		}
	}
	beforeDestroy(): void{
		if(this.interval){
			clearInterval(this.interval);
		}
	}

	cancelConfirm(): void{
		this.showConfirm = false;
		this.confirmText = "";
		this.confirmAction = null;
	}
	showConfirm: boolean = false;
	confirmText: string = "";
	confirmAction: string | null = null;
	start(confirmed?: boolean): void{
		if(this.timer.isProtected && confirmed !== true){
			this.showConfirm = true;
			this.confirmText = `Start ${this.timer.label}?`;
			this.confirmAction = "start";
			return;
		}
		this.timer.start();
		this.internalTick++;
		this.$emit('start');
		this.cancelConfirm();
	}
	stop(confirmed?: boolean): void{
		if(this.timer.isProtected && confirmed !== true){
			this.showConfirm = true;
			this.confirmText = `Stop ${this.timer.label}?`;
			this.confirmAction = "stop";
			return;
		}
		this.timer.stop();
		this.internalTick++;
		this.$emit('stop');
		this.cancelConfirm();
	}
	reset(confirmed?: boolean): void{
		if(this.timer.isProtected && confirmed !== true){
			this.showConfirm = true;
			this.confirmText = `Reset ${this.timer.label}?`;
			this.confirmAction = "reset";
			return;
		}
		this.timer.reset();
		this.internalTick++;
		this.$emit('reset');
		this.cancelConfirm();
	}

	edit(): void{
		this.$emit('click:edit');
	}
	deleteTimer(): void{
		this.$emit('click:delete');
	}

}
</script>
<style lang="scss" scoped>
.time{
	letter-spacing: 1px;
}
.isProtected-icon-position{
	position: absolute;
	top: 16px;
	left: 50%;
	width: 0;
}
</style>