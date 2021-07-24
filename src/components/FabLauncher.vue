<template>
	<v-speed-dial
		v-model="fab"
		absolute
		bottom
		right
		direction="top"
	>
		<template v-slot:activator>
			<v-btn
				v-model="fab"
				color="primary"
				dark
				fab
			>
				<v-icon :class="{ 'rotate': !fab }">
					mdi-close
				</v-icon>
			</v-btn>
		</template>
		<v-btn
			fab
			dark
			small
			color="accent"
			@click="$emit('click:timer')"
		>
			<v-icon>mdi-timer-outline</v-icon>
		</v-btn>
	</v-speed-dial>
</template>
<script lang="ts">
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Component, Mixins } from 'vue-property-decorator';
@Component
export default class FabLauncher extends Mixins(VuetifyMixin) {
	fab: boolean = false;
}
</script>
<style lang="scss" scoped>
.rotate{
	transform: rotateZ(225deg);
}
</style>