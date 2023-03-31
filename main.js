const {createApp} = Vue

const app = createApp({
	data(){
		return {
			apiUrl: ' '
			events: [],

		}
	},
	created(){
		this.pedirDatos()

	},
	mounted(){

	},
	methods:{
		pedirDatos(){
			fetch(this.apiUrl)
			.then(response => response.json())
			.then(datosAPi=>{
				this.events = datosApi
			})
		}
	},
	computed:{

	}

}).mount('#app')