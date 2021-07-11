<template>
  <v-container class="py-16">
		<!-- <v-row>
			<v-col cols="12" offset="0" md="6" offset-md="3">
				<v-form v-model="formValue.valid" @submit.prevent="loginWithAnonymous(formValue)">
					<v-card class="pa-6">
						<v-text-field
							:rules="rulesRequired"
							type="text"
							placeholder="Enter your name"
							v-model="formValue.displayName"
						/>
						<v-btn type="submit" color="primary" large block :disabled="!formValue.valid" class="mt-6">
							Continue
						</v-btn>
					</v-card>
				</v-form>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" offset="0" md="6" offset-md="3" class="d-flex my-12">
				<hr class="my-auto flex-grow-1"/>
				<div class="my-auto mx-4">
					or
				</div>
				<hr class="my-auto flex-grow-1"/>
			</v-col>
		</v-row> -->
		<v-row>
			<v-col cols="12" offset="0" md="6" offset-md="3">
				<v-card class="pa-12">
					<v-btn @click="loginWithGoogle" color="primary" large block>
						Signin with Google
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { FormRulesMixin } from '@/mixins/FormRulesMixin';
import { FirebaseAuthMixin } from '@/mixins/FirebaseAuthMixin';

@Component({
  components: {},
})
export default class Login extends Mixins(FirebaseAuthMixin, FormRulesMixin) {
  formValue = {
		valid: false,
		displayName: ""
	};
}
</script>