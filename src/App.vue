<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Dashboard</router-link> |
			<router-link to="/about">About</router-link> |
			<router-link to="/login" v-if="!authenticated">Login</router-link>
			<router-link to="/logout" v-else>Log out</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script>
export default {
	computed: {
		authenticated() {
			return JSON.parse(localStorage.getItem('authenticated'))
		}
	}
}
</script>

<style lang="scss">
body {
	background-color: #f4f7fd;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
