<template>
	<v-card class="py-3" flat outlined>
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

	get Timer(): TimerModel{
		return new TimerModel(this.timer.label, this.timer.intervals);
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

	start(): void{
		this.timer.start();
		this.internalTick++;
	}
	stop(): void{
		this.timer.stop();
		this.internalTick++;
	}
	reset(): void{
		this.timer.reset();
		this.internalTick++;
	}

}
</script>
<style lang="scss" scoped>
.time{
	letter-spacing: 1px;
}
</style>