<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="modal">
				<header class="modal-header">
					<slot name="modal-header">
					</slot>
				</header>
				<section class="modal-body">
					<slot name="modal-body">
						<h2>Form</h2>
					</slot>
				</section>
				<footer class="modal-footer">
					<slot name="modal-footer">
					</slot>
					<button @click="close" id="exit-modal">&times;</button>
				</footer>
			</div>
		</div>
	</transition>
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

<style lang="scss">
	
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
	position: relative;
	padding: 2rem;
	background: #FFFFFF;
	box-shadow: 2px 2px 20px 1px;
	width: 600px;

	h1 {
		margin: 0 0 1rem;
	}

	input {
		display: block;
		margin-bottom: .5rem;
		padding: .75rem 1.5rem;
		width: 100%;
		border: 1px solid #e8e8e8;
		outline: none;
		border-radius: 3px;
		font-size: 1rem;
		-webkit-appearance: none;
	}

	form button {
		padding: .75rem 1.5rem;
		margin: .5rem .5rem 0;
		border-radius: 8px;
		border: none;
		box-shadow: none;
		outline: none;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 300ms ease-out;
		background-color: #417cfe;
		color: #fff;

		&:hover {
			background-color: darken(#417cfe, 10%);
		}
	}

	#exit-modal {
		position: absolute;
		top: 0;
		right: 1rem;
		background-color: transparent;
		color: #417cfe;
		font-size: 3rem;
		border: none;
		outline: none;
		cursor: pointer;
		-webkit-appearance: none;
	}
}

.modal-fade-enter,
.modal-fade-leave-active {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 300ms ease-out;
}

</style>