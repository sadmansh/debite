<template>
	<div class="modal-backdrop">
		<div class="modal">
			<header class="modal-header">
				<slot name="header">
				</slot>
			</header>
			<section class="modal-body">
				<slot name="body">
					<h2>Form</h2>
				</slot>
			</section>
			<footer class="modal-footer">
				<slot name="footer">
					<button @click="close">Exit</button>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
	
export default {
	name: 'Modal',
	props: {
		newRecord: Object,
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
}

</script>

<style lang="scss" scoped>
	
.modal-backdrop {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, .5);
}

.modal {
	background: #FFFFFF;
	box-shadow: 2px 2px 20px 1px;
}

</style>