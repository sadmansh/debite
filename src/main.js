import Vue from 'vue'
import App from './App.vue'
import router from './router'

import firebase from 'firebase/app'
import { firebaseConfig } from './firebase'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

export const { Timestamp } = firebase.firestore

router.beforeEach((to, from, next) => {
	if (!to.meta.protected) {
		next()
	}
	else {
		let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				next()
			}
			else {
				router.push('/login')
			}
		})
		unsubscribe()
	}
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser
	if (to.meta.protected && !currentUser) {
		router.push('login')
	}
	else {
		next()
	}
})

let app;
firebase.auth().onAuthStateChanged(async user => {
	if (!app) {
		let user = await firebase.auth().currentUser

		app = new Vue({
			router,
			created() {
				if (!user) {
					this.router.push('/login')
				}
			},
			render: h => h(App)
		}).$mount('#app')
	}
})

Vue.config.productionTip = false