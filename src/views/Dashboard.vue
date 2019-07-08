<template>
  <div id="dashboard">
    <Expenses />
  </div>
</template>

<script>
// @ is an alias to /src
import Expenses from '@/components/Expenses.vue'

export default {
	name: 'dashboard',
	components: {
		Expenses
	}
}
</script>

<style lang="scss">
	
#dashboard {
	margin: 0 auto;
	max-width: 1200px;
}

</style>
