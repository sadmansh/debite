<template>
	<select name="months" id="months">
		<option v-for="(month, index) in months" :value="index + 1" v-bind:selected="isCurrentMonth(index + 1)">{{ month }}</option>
	</select>
</template>

<script>

export default {
	name: 'Months',
	data() {
		return {
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			currentMonth: new Date().getMonth() + 1,
		}
	},
	methods: {
		isCurrentMonth(month) {
			if (parseInt(month) == this.currentMonth) {
				return true
			}
			return false
		},
	},
	mounted() {
		document.getElementById('months').addEventListener('change', () => {
			let selectedMonth = document.getElementById('months').value
			this.$emit('selectedMonth', selectedMonth) 
		})
	}
}

</script>