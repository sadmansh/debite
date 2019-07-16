<template>
	<div id="next-prev">
		<button class="prev"><span class="arrow">Prev</span></button>
		<select name="sort-by" id="sort-by">
			<option value="day">Day</option>
			<option value="month">Month</option>
		</select>
		<button class="next"><span class="arrow">Next</span></button>
	</div>
</template>

<script>

export default {
	name: 'NextPrev',
	props: {
		sortBy: String,
	}
}

</script>

<style lang="scss" scoped="">
	#next-prev {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-right: 1rem;

		button {
			padding: .75rem;
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

		#sort-by {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			margin: 0 1rem;
			padding: .5rem 2rem .5rem 1rem;
			border-radius: 6px;
			border: 1px solid #eaeaea;
			outline: none;
			background-color: #fff;
			font-size: 1rem;
		}
	}
</style>