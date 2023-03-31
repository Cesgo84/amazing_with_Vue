async function getEventsData() {
	let data = await fetch('../../back/amazing.json')
  	.then(response => response.json())
  	.then(data => {
  		const events=data.events;
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get('id');
		console.log(id)
		const event = events.find((event) => event._id == id);
		const detailContainer = document.querySelector('#eventDetail');
		createDetails(event,detailContainer);
  		return data;
	}).catch ((error) => console.error(error)) 
	console.log(data);	
}
getEventsData();
  
import {createDetails} from './functions.js'







