/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from 'vue-property-decorator';

@Component
export class FormRulesMixin extends Vue {
	rulesOptionalEmail = [
		(v: any): string | boolean => /(.+@.+\.[a-z,A-Z]|^$)/.test(v) || 'E-mail must be valid',
	];
	rulesEmail = [
		(v: any): string | boolean => !!v || 'E-mail is required',
		(v: any): string | boolean => /.+@.+\.[a-z,A-Z]/.test(v) || 'E-mail must be valid',
	];
	rulesRequired = [
		(v: any): string | boolean => !!v || 'Required',
	];
}
