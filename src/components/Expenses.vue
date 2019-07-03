<template>
	<div class="expenses">
		<h1>Expenses</h1>
		<div class="expenses-inner">
			<div class="expenses-header">
				<div class="select-month">
					<label for="months">
						Showing expenses for:
						<select name="months" id="months">
							<option value="jan">January</option>
						</select>
					</label>
				</div>
				<button id="add-expense">Add Expense</button>
			</div>
			<form @submit.prevent="addExpense(title, amount, bank, comments)">
				<input type="text" v-model="title" placeholder="Title">
				<input type="number" v-model="amount" placeholder="Amount">
				<input type="text" v-model="bank" placeholder="Bank">
				<input type="text" v-model="comments" placeholder="Comments">
				<button type="submit">Create Expense</button>
			</form>
			<table class="expenses-table">
				<thead>
					<tr>
						<th class="title">Title</th>
						<th class="amount">Amount</th>
						<th class="bank">Bank</th>
						<th class="date">Date</th>
						<th class="comments">Comments</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(expense, idx) in expenses" :key="idx">
						<td class="title">{{ expense.title }}</td>
						<td class="amount">{{ expense.amount }}</td>
						<td class="bank">{{ expense.bank }}</td>
						<td class="date">{{ expense.date.toDate().toDateString() }}</td>
						<td class="comments">{{ expense.comments }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>Total this month</td>
						<td>{{ monthTotal }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</template>

<script>
import { db, Timestamp } from '@/main'

export default {
	name: 'Expenses',
	props: {
		newRecord: Object
	},
	data() {
		return {
			expenses: [],
			monthTotal: 0,
			title: '',
			amount: 0,
			bank: '',
			comments: '',
		}
	},
	firestore() {
		return {
			expenses: db.collection('expenses').orderBy('date', 'desc')
		}
	},
	methods: {
		addExpense(title, amount, bank, comments) {
			let date = Timestamp.fromDate(new Date())
			db.collection('expenses').add({ title, amount, bank, date, comments })
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h1 {
	text-align: left;
}

.expenses-inner {
	border: 1px solid #eaeaea;
	border-radius: 5px;
	background-color: #fff;

	.expenses-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		text-align: left;

		label {
			margin-right: 1rem;
			color: #989898;
		}

		select {
			-webkit-appearance: none;
			padding: .5rem 2rem .5rem 1rem;
			border-radius: 6px;
			border: 1px solid #eaeaea;
			outline: none;
			background-color: #fff;
			font-size: 1rem;
		}

		button {
			padding: .75rem 1.5rem;
			border-radius: 8px;
			border: none;
			box-shadow: none;
			outline: none;
			background-color: #417cfe;
			font-size: 1rem;
			color: #fff;
			cursor: pointer;
			transition: background-color 300ms ease-out;

			&:hover {
				background-color: darken(#417cfe, 10%);
			}
		}
	}
}

table {
	width: 100%;
	border-spacing: 0;

	thead,
	tfoot {
		border: none;

		tr {
			background-color: #f4f7fd;
			font-weight: 600;
		}
	}

	th,
	td {
		padding: 1rem;
		border: none;
		text-align: left;
	}

	td {
		border-bottom: 1px solid #f4f7fd;
	}
}

</style>
