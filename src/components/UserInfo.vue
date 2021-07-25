<template>
	<div :title='DisplayName'>
		<div v-if="user === null">
			user is null
		</div>
		<div v-else class="d-flex">
			<div v-if="showAvatar">
				<v-avatar :size="Size" :style="AvatarStyle">
					<v-img v-if="user.photoURL" :src="user.photoURL" />
					<v-icon v-else>
						mdi-account
					</v-icon>
				</v-avatar>
			</div>
			<div v-if="!hideName" class="my-auto mx-2 display-name">
				{{ DisplayName }}
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { User } from '@/models/User';
@Component
export default class UserInfo extends Mixins(VuetifyMixin){
	@Prop({ default: true, type: Boolean }) hideName!: boolean;
	@Prop({ default: false, type: Boolean }) showAvatar!: boolean;
	@Prop({ default: 36 }) size!: number;
	@Prop({ default: null }) user!: User | null;

	get AvatarStyle(): Record<string, string>{
		return {
			'border': `2px solid ${this.getColor('primary')}`,
		}
	}

	get StatusColor(): number{
		return this.size;
	}
	get Size(): number{
		return this.size;
	}

	get DisplayName(): string{
		if(this.user === null) return 'N/A';
		if(!this.user.displayName) return 'Anon';
		return this.user.displayName;
	}
}
</script>
<style lang="scss" scoped>
.user-list{
	white-space: pre;
	font-family: monospace !important;
}
.display-name{
	font-size: 16px;
}
</style>