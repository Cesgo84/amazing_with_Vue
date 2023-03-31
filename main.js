const {createApp} = Vue

const app = createApp({
	data(){
		return {
			apiUrl: './back/amazing.json',
			data: [],
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
			.then(datosApi=>{
				this.data = datosApi
				this.events = this.data.events
			})
		}
	},
	computed:{

	}

}).mount('#app') 