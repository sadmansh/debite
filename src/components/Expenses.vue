<template>
	<div class="expenses">
		<h1>Hey {{ user.displayName.substr(0, user.displayName.indexOf(' ')) }} &#x1F44B;</h1>
		<h2>Here are your latest expenses</h2>
		<div class="expenses-inner">
			<div class="expenses-header">
				<NextPrev sortBy="month" />
				<div class="select-month">
					<label for="months">
						Showing expenses for:
						<Months v-on:selectedMonth="sortExpensesByMonth"/>
					</label>
				</div>
				<button id="add-expense" @click="showModal">Add Expense</button>
			</div>
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
						<td class="amount">{{ formatAmount(expense.amount) }}</td>
						<td class="bank">{{ expense.bank }}</td>
						<td class="date">{{ expense.date.toDate().toDateString() }}</td>
						<td class="comments">{{ expense.comments }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>Total this month</td>
						<td>{{ formatAmount(monthTotal) }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<Modal v-show="modalVisibility" @close="closeModal">
			<div slot="modal-header">
				<h1>Add Expense</h1>
			</div>
			<div slot="modal-body">
				<form @submit.prevent="createExpense(userRecord.title, userRecord.amount, userRecord.bank, userRecord.comments)">
					<input type="text" v-model="userRecord.title" placeholder="Title...">
					<input type="number" step="0.01" v-model="userRecord.amount" placeholder="Amount...">
					<input type="text" v-model="userRecord.bank" placeholder="Bank...">
					<input type="text" v-model="userRecord.comments" placeholder="Comments...">
					<button slot="modal-footer" type="submit" @click="closeModal">Add Expense</button>
				</form>
			</div>
		</Modal>
	</div>
</template>

<script>
import { db, Timestamp } from '@/main'
import firebase from 'firebase/app'
import Modal from './Modal.vue'
import Months from './Months.vue'
import NextPrev from './NextPrev.vue'

export default {
	name: 'Expenses',
	components: {
		Modal,
		Months,
		NextPrev,
	},
	props: {
		newRecord: Object
	},
	data() {
		return {
			expenses: [],
			monthTotal: 0,
			userRecord: {
				title: '',
				amount: 0,
				bank: '',
				comments: '',
			},
			modalVisibility: false,
			user: firebase.auth().currentUser,
			currentDate: {
				day: new Date().getDate(),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			},
		}	
	},
	methods: {
		createExpense(title, amount, bank, comments) {
			let date = Timestamp.fromDate(new Date())
			db.collection('users').doc(this.user.uid).collection('expenses').add({
				title: title,
				amount: amount,
				bank: bank,
				date: date,
				comments: comments,
			})
		},
		getExpenses(month = this.currentDate.month) {
			let self = this
			const ref = db.collection('users').doc(this.user.uid).collection('expenses').where('date', '>=', Timestamp.fromDate(new Date(`2019-${month}`))).where('date', '<', Timestamp.fromDate(new Date(`2019-${parseInt(month) + 1}`))).orderBy('date', 'desc')
			ref.onSnapshot(function(querySnapshot) {
				let expenses = []
				querySnapshot.forEach(function(doc) {
					expenses.push(doc.data())
				})
				self.expenses = expenses
				self.calculateTotal()
			})
		},
		sortExpensesByMonth(month) {
			this.getExpenses(month)
			console.log('ran the function')
		},
		showModal() {
			this.modalVisibility = true
		},
		closeModal() {
			this.modalVisibility = false
		},
		calculateTotal() {
			this.monthTotal = 0
			this.expenses.forEach((expense) => {
				this.monthTotal += parseInt(expense.amount)
			})
		},
		formatAmount(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		}
	},
	created() {
		this.getExpenses()
	}
}

</script>

<style scoped lang="scss">

h1,
h2 {
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

	thead {
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

	tfoot td {
		font-weight: 600;
	}
}

</style>
