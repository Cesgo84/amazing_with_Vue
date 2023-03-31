const {createApp} = Vue

const app = createApp({
	data(){
		return {
			apiUrl: '../back/amazing.json',
			data: [],
			events: [],

		}
	},
	created(){
		this.fetchData() 

	},
	mounted(){

	},
	methods:{
		fetchData(){
			fetch(this.apiUrl)
			.then(response => response.json())
			.then(datosApi=>{
				this.data = datosApi
				this.events = this.data.events
			})
		}
		
	},
	computed:{
		filteredEvents() {
		   	return this.events.filter(event =>  event.assistance && !event.estimate);
		}

	}

}).mount('#app') 


// async function getEventsData() {
// 	let data = await fetch('../../back/amazing.json')
//   	.then(response => response.json())
//   	.then(data => {
// 		const placeOfCards = document.getElementById('lot-of-cards');
// 		const input = document.querySelector('input');
// 		const checksCategories = document.getElementById('category_checks');
// 		const ruta = './'
//   		const eventsOfThePast = pastEvents(data.events,data.currentDate)
//   		settingCategoryCheckBoxes(eventsOfThePast)
//   		cardsMakerII(eventsOfThePast,placeOfCards,ruta);
// 		input.addEventListener('input', ()=> {
// 			amazingFilter(eventsOfThePast,placeOfCards,input.value,ruta);
// 		})
// 		checksCategories.addEventListener('change', ()=> {
// 			amazingFilter(eventsOfThePast,placeOfCards,input.value,ruta);
// 		})
//   	return data;
// 	}).catch ((error) => console.error(error)) 
//   	 console.log(data);
// }  
// getEventsData()

// import {cardsMakerII, pastEvents, amazingFilter, settingCategoryCheckBoxes, filterByCheckboxes} from './functions.js';


