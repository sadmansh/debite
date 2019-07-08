<template>
	<div id="login">
		<div id="firebase-login">
			
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase'
	import firebaseui from 'firebaseui'
	import '../../node_modules/firebaseui/dist/firebaseui.css'
	import { firebaseConfig } from '../firebase'

	export default {
		mounted() {
			let self = this

			let uiConfig = {
				signInOptions: [
					{
						provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,

					},
					{
						provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
					},
					{
						provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					}
				],
				callbacks: {
					signInSuccessWithAuthResult() {
						localStorage.setItem('authenticated', true)
						window.location.href = '/'
					}
				}
			}

			let ui = new firebaseui.auth.AuthUI(firebase.auth())
			ui.start('#firebase-login', uiConfig)
		}
	}
</script>