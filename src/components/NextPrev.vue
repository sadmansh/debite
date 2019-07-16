<template>
	<div id="next-prev">
		<button class="prev"><span class="arrow">Prev</span></button>
		<button class="next"><span class="arrow">Next</span></button>
	</div>
</template>

<script>

export default {
	name: 'NextPrev',
}

</script>

<style lang="scss" scoped="">
	#next-prev {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		button {
			padding: .75rem;
			margin-right: 1rem;
			border: 1px solid #000;
			border-radius: 3px;
			cursor: pointer;
			outline: none;
			transition: background-color 300ms ease-out;

			span {
				display: block;
				width: 8px;
				height: 8px;
				border-top: 2px solid #000;
				border-right: 2px solid #000;
				background-color: transparent;
				font-size: 0;
				transition: color 300ms ease-out;
			}

			&.prev {
				padding-left: 1rem;

				span {
					transform: rotate(-135deg);
					transform-origin: center;
				}
			}

			&.next {
				padding-right: 1rem;
				span {
					transform: rotate(45deg);
					transform-origin: center;
				}
			}

			&:hover {
				background-color: #000;

				span {
					border-color: #fff;
				}
			}
		}
	}
</style>