<template>
  <v-container class="py-6">
    Welcome to Multi Timer
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { CurrentUserMixin } from '@/mixins/CurrentUserMixin';
import {  } from '@/services';


@Component({
  components: {
  },
})
export default class Home extends Mixins(CurrentUserMixin) {

  
}
</script>
<style lang="scss" scoped>

</style>