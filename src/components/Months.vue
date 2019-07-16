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

<style lang="scss" scoped="">
	
select {
	-webkit-appearance: none;
	padding: .5rem 2rem .5rem 1rem;
	border-radius: 6px;
	border: 1px solid #eaeaea;
	outline: none;
	background-color: #fff;
	font-size: 1rem;
}

</style>