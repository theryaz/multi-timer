<template>
	<v-dialog fullscreen :value="value" @input="(val) => $emit('input', val)">
		<v-card class="px-4 py-6" v-if="timer">
			<v-card-title class="primary">
				<v-btn fab elevation="0" color="accent" class="mr-4">
					<v-icon size="28">
						mdi-pencil
					</v-icon>
				</v-btn>
				{{EditTimerTitle}}
			</v-card-title>
			<v-card-text class="pa-6">
				<v-form @submit.prevent="submit">
					<v-row dense>
						<v-col>
							<v-text-field outlined label="Label" v-model="formTimer.label" hide-details/>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col offset="6" cols="6">
							<v-switch
								inset label="Protected"
								v-model="formTimer.isProtected"
								color="primary"
								persistent-hint
								hint="Requires prompt to make changes"
							/>
						</v-col>
					</v-row>
					<template v-if="formTimer.intervals.length > 0">
						<v-divider class="my-6" />
						<v-sheet height="200" class="timeline-scroll-wrapper">
							<v-timeline
								align-top
								dense
							>
								<template v-for="(interval, index) of formTimer.intervals">
									<v-timeline-item dark
										:key="`${index}_started`"
										color="primary"
										small dense
										icon="mdi-play"
									>
										<span>{{ formatTime(interval.started) }}</span>
										<span class="ml-4 text--secondary">
											Started
										</span>
										<v-dialog v-if="index === 0" v-model="showTimePicker">
											<v-card class="pa-6">
												<v-datetime-picker
													label="Modify Start Time"
													v-model="datetime"
													@input="onDateChange"
													:datePickerProps="{
														allowedDates: allowedDates
													}"
												>
													<template slot="dateIcon">
														<v-icon>mdi-calendar</v-icon>
													</template>
													<template slot="timeIcon">
														<v-icon>mdi-clock</v-icon>
													</template>
												</v-datetime-picker>
												<v-card-actions>
													<v-spacer />
													<v-btn icon color="stopRed" @click="showTimePicker = false">
														<v-icon>
															mdi-close
														</v-icon>
													</v-btn>
													<v-btn icon color="accent" @click="acceptTime">
														<v-icon>
															mdi-check
														</v-icon>
													</v-btn>
												</v-card-actions>
											</v-card>
											<template v-slot:activator="{ on }">
												<v-btn v-on="on" elevation="0" x-small class="ml-4">
													Edit
												</v-btn>
											</template>
										</v-dialog>
										<div v-if="!isToday(interval.started)" class="text-caption text--disabled">
											{{ formatDate(interval.started) }}
										</div>
									</v-timeline-item>
									<v-timeline-item dark
										v-if="interval.stopped"
										:key="`${index}_stopped`"
										color="accent"
										small dense
										icon="mdi-stop"
									>
										<span>
											{{ formatTime(interval.stopped) }}
										</span>
										<span class="ml-4 text--secondary">
											Stopped
										</span>
										<div v-if="!isToday(interval.stopped)" class="text-caption text--disabled">
											{{ formatDate(interval.stopped) }}
										</div>
									</v-timeline-item>
								</template>
								<v-timeline-item dark
									v-if="timer.IsRunning"
									color="primary"
									small dense
									icon="mdi-timer-outline"
								>
									<span class="text--secondary">
										Running
									</span>
								</v-timeline-item>
							</v-timeline>
						</v-sheet>
					</template>
					<button type="submit" />
				</v-form>
			</v-card-text>
			<v-card-actions class="px-6">
				<v-spacer />
				<v-btn class="ml-2" color="primary" large outlined @click="$emit('input', false)">
					Cancel
				</v-btn>
				<v-btn class="ml-2 white--text" color="primary" large @click="submit">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script lang="ts">
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { TimerModel } from '@/models/TimerModel';
import { DateTime } from 'luxon';

@Component
export default class EditTimerDialog extends Mixins(VuetifyMixin) {

	@Prop({ default: false }) value!: boolean;
	@Prop({ default: null }) timer!: TimerModel | null;

	datetime: Date | null = null;
	showTimePicker: boolean = false;

	acceptTime(): void{
		if(this.datetime === null) return;
		this.formTimer.FirstInterval.started = this.datetime;
		this.showTimePicker = false;
	}

	formTimer: TimerModel = this.Timer;
	@Watch('timer')
	initFormTimer(){
		if(this.Timer !== null){
			this.formTimer = TimerModel.deserialize(this.Timer);
			this.datetime = this.formTimer.FirstInterval ? this.formTimer.FirstInterval.started : null;
		}
	}
	mounted(){
		this.initFormTimer();
	}
	onDateChange(newDate: Date): void{
		console.log("newDate", newDate);

	}

	get Timer(): TimerModel{
		if(this.timer === null){
			return new TimerModel("N/A");
		}
		return this.timer;
	}
	get EditTimerTitle(){
		return `Editing ${this.Timer.label}`;
	}

	format = TimerModel.FormatTime;
	formatTime(date: Date): string{
		return DateTime.fromJSDate(date).toFormat('hh:mm a');
	}
	formatDate(date: Date): string{
		return DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy');
	}
	isToday(date: Date): boolean{
		return DateTime.fromJSDate(date).hasSame(DateTime.local(),"day");
	}
	allowedDates(date: string): boolean{
		const [YY,MM,DD] = date.split('-');
		const now = new Date();
		return new Date(+YY,+MM-1,+DD,now.getHours(), now.getMinutes(), now.getSeconds()).getDate() <= now.getDate();
	}
	allowedHours(v: string): boolean{
		console.log("allowedHours", v);
		return true;
	}
	allowedMinutes(v: string): boolean{
		console.log("allowedMinutes", v);
		return true;
	}

	submit(): void{
		this.$emit('submit', this.formTimer);
	}

}
</script>
<style lang="scss" scoped>
.timeline-scroll-wrapper{
	overflow: hidden;
	overflow-y: auto;
}
</style>