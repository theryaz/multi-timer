<template>
	<v-dialog fullscreen :value="value" @input="(val) => $emit('input', val)">
		<v-card class="px-4 py-6">
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
								v-model="formTimer.protected"
								color="secondary"
								persistent-hint
								hint="Requires prompt to make changes"
							/>
						</v-col>
					</v-row>
					<v-divider class="my-6" />
					<v-sheet height="200" class="timeline-scroll-wrapper">
						<v-timeline
							align-top
							dense
						>
							<template v-for="(interval, index) of formTimer.intervals">
								<v-timeline-item
									:key="index"
									color="primary"
									small dense
									icon="mdi-play"
									icon-color="black"
								>
									<span>{{ formatTime(interval.started) }}</span>
									<span class="ml-4 text--secondary">
										Started
									</span>
									<div class="text-caption text--disabled">
										{{ formatDate(interval.started) }}
									</div>
								</v-timeline-item>
								<v-timeline-item
									v-if="interval.stopped"
									:key="index"
									color="accent"
									small dense
									icon="mdi-stop"
									icon-color="black"
								>
									<span>
										{{ formatTime(interval.stopped) }}
									</span>
									<span class="ml-4 text--secondary">
										Stopped
									</span>
									<div class="text-caption text--disabled">
										{{ formatDate(interval.started) }}
									</div>
								</v-timeline-item>
							</template>
						</v-timeline>
					</v-sheet>
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

	formTimer: TimerModel = this.Timer;
	@Watch('timer')
	initFormTimer(){
		this.formTimer = new TimerModel(this.Timer.label, this.Timer.intervals);
	}
	mounted(){
		this.initFormTimer();
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