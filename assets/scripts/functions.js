
//FUNCTIONS:
function pastEvents (arrayEntrada, date){
	const eventsOfThePast=[];
	arrayEntrada.forEach(event =>{
		if (event.date<date){
			eventsOfThePast.push(event)
		}
	})
	return eventsOfThePast;
}

function upcomingEvents (arrayEntrada, date){
	const eventsToCome=[];
	arrayEntrada.forEach(event =>{
		if (event.date>date){
			eventsToCome.push(event)
		}
	})
	return eventsToCome;
}

function cardsMakerII(array,container,ruta="./"){
	if(array.length == 0){
        container.innerHTML = `<h2 class=" fw-bold">No item match your Search</h2>`
        return
    }
	container.innerHTML=``
	let fragment = document.createDocumentFragment();
	array.forEach(event => {
		let card = document.createElement("div");
		card.innerHTML=`<div class="card d-flex">
					<a href="${ruta}details.html?id=${event._id}"><img src=${event.image} class="card-img-top object-fit-cover" alt="event"></a>
					<div class="card-body d-flex flex-column">
						<h5 class="card-title">${event.name}</h5>
						<p class="card-text flex-grow-1">${event.description}</p>
						<p class="price card-text">Price:${event.price}</p>
						<a href="${ruta}details.html?id=${event._id}" class="btn btn-primary me-auto">view details</a>
					</div>
				</div>`;
		fragment.appendChild(card);
	})
	return container.appendChild(fragment);
}

function filterByInputSearch (array, text){
	let filteredEvents = array.filter(event=>event.name.toLowerCase().includes(text.toLowerCase()));
	return filteredEvents;
}

function amazingFilter(array,container,text,ruta="./"){
	window.event.preventDefault();
    let fisrstRound = filterByInputSearch(array,text);
    let secondRound = filterByCheckboxes (fisrstRound);
    cardsMakerII(secondRound,container,ruta);
}

function createDetails(object,target){
	let event = document.createElement("div");
	event.className= "cardDetails d-flex flex-column"
	event.innerHTML= `<img src=${object.image} class="details-img object-fit-cover mt-5" alt="cardDetail">
					<div class="card-body">
						<h5 class="card-title pt-4">${object.name}</h5>
						<p class="card-text">${object.description}</p>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3 m-0">
							<dt>Date:</dt>
							<dd>${object.date}</dd>									
						</dl>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3 m-0">
							<dt>Category:</dt>
							<dd>${object.category}</dd>
						</dl>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3 m-0">
							<dt>Place:</dt>
							<dd>${object.place}</dd>
						</dl>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3 m-0">
							<dt>Capacity:</dt>
							<dd>${object.capacity}</dd>
						</dl>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3 m-0">
							<dt>Assistance:</dt>
							<dd>${(object.assistance? object.assistance : object.estimate)}</dd>
						</dl>
						<dl class="card-text d-flex flex-wrap justify-content-baseline gap-3">
							<dt>Price:</dt>
							<dd>${object.price}</dd>
						</dl>
						<div class="d-flex flex-Wrap justify-content-end">
							<a href="javascript:history.back()" class="d-flex btn btn-details align-self-end w-50 go bg-primary text-light">Go Back</a>
						</div>
					</div>`;
	return target.appendChild(event);
}


function settingCategoryCheckBoxes(array) {
	let category = array.map(event => event.category);
	let setCategory = new Set(category);
	let arrayCategory = Array.from(setCategory);
	let checksCategories = document.getElementById('category_checks');
	let fragment = document.createDocumentFragment();
	arrayCategory.forEach((category)=>{
		let check = document.createElement("label");
		check.classList = 'col-12 col-md';
		check.htmlFor = `${category.toLowerCase()}`;
		check.innerHTML = `<input type="checkbox" name="${category.toLowerCase()}" id="${category.toLowerCase()}" value="${category.toLowerCase()}">${category}`;
		fragment.appendChild(check);
	})
	return checksCategories.insertBefore(fragment,search);
}


function filterByCheckboxes (array){
	let checkBoxes = document.querySelectorAll("input[type='checkbox']");
	let arrChBoxes=Array.from(checkBoxes);
	let arrChBoxesChecked=arrChBoxes.filter(check=>check.checked);
	let arrChBoxesCheckedValues=arrChBoxesChecked.map(checkChecked=>checkChecked.value);
	let filteredEvents=array.filter(event => arrChBoxesCheckedValues.includes(event.category.toLowerCase()));
	if(arrChBoxesChecked.length>0){
		return filteredEvents;
	}
	return array;
} 

let mappingPercentOfAssistance = (objectsArray) => objectsArray.map(event =>{
        return event.assistance ? Math.round(event.assistance*100/event.capacity) : Math.round(event.estimate*100/event.capacity);
    })

function dataForEventsTable (objectsArray){ 
    const percentOfAssistance = mappingPercentOfAssistance(objectsArray);
    let largestCapEvent = []; 
    let capacity = 0;
    objectsArray.forEach(event =>{
        event.capacity > capacity ? (capacity = event.capacity , largestCapEvent = event.name) : capacity; 
    })
    // console.log(percentOfAssistance);
    // console.log(capacity);
    const mostAttendedEvent = (objectsArray[percentOfAssistance.indexOf(Math.max(...percentOfAssistance))].name);
    const lessAttendedEvent = (objectsArray[percentOfAssistance.indexOf(Math.min(...percentOfAssistance))].name);
    // console.log(mostAttendedEvent);
    // console.log(lessAttendedEvent);
    // console.log(largestCapEvent);
    // console.log(capacity);
    const dataRowTableOne = {
        highestAttendance: mostAttendedEvent,
        lowestAttendance: lessAttendedEvent,
        largerCapacity: largestCapEvent
    };
    // console.log(dataTableOne);
    return dataRowTableOne
}

function fillerTableDataTR (container,object){ 
    // console.log(object);
    let tRow = document.createElement('tr');
    Object.values(object).forEach(value=> {
    let tData = document.createElement("td");
    tData.innerText= value
    tRow.appendChild(tData);
})
    return container.appendChild(tRow)
}

function fillerTableDataTrII(container,objectsArray){
    objectsArray.forEach(object => {
        fillerTableDataTR(container, object)
    })
}

function dataForTablesUpcomingAndPast(arrayDeObjetos,eventsFunction,date){ //  eventsFunction DEPENDS ON WHETHER THEY ARE PAST OR UPCOMING EVENTS use pastEvents or upcomingEvents accordingly.
    let eventsByDate = eventsFunction(arrayDeObjetos,date);
    // console.log(eventsByDate);
    const objectReduced = eventsByDate.reduce((categories,event) => {
        const category = event.category;
        const capacity = event.capacity;
        const assistance = 'assistance' in event ? event.assistance : event.estimate;
        const revenue = event.assistance ? event.price*event.assistance : event.price*event.estimate;
        // console.log(revenue);
        categories[category] = categories[category] || {
            category: category,
            capacity: 0,
            assistance: 0,
            revenue: 0,
        };
        categories[category].capacity += capacity;
        categories[category].assistance += assistance;
        categories[category].revenue += revenue;

        // console.log(categories);
        return categories;
    }, {});
    // console.log(Object.values(objectReduced));
    const arrayForTablePrev = Object.values(objectReduced); 
    // console.log(arrayForTablePrev);
    const percentOfAssistance = arrayForTablePrev.map(category => (category.assistance*100/category.capacity).toFixed(2));
    // console.log(percentOfAssistance);
    const arrayforTableAlmost = arrayForTablePrev.map(group => ({...group, percentOfAssistance: percentOfAssistance[arrayForTablePrev.indexOf(group)]}));
    // console.log(arrayforTableAlmost);
    const arrayforTable = arrayforTableAlmost.map(({capacity, assistance, ...rest}) => ({...rest}));
    // console.log(arrayforTable);
    return arrayforTable;
}


//CODIGO GUARDADO:

// input.addEventListener('input', amazingFilter);
//  input.addEventListener('input',()=>{
// 	let filteredEvents=filterByInputSearch(events, input.value);
// 	cardsMakerII(filteredEvents,placeOfCards);
// })

// checksCategories.addEventListener('change', amazingFilter);
// checksCategories.addEventListener('change',()=>{
// 	let filteredEvents = filterByCheckboxes(events);
// 	cardsMakerII(filteredEvents,placeOfCards);
// })


export {
	cardsMakerII,
	upcomingEvents,
	pastEvents,
	settingCategoryCheckBoxes,
	filterByCheckboxes,
	filterByInputSearch,
	amazingFilter,
	createDetails,
	dataForTablesUpcomingAndPast,
	mappingPercentOfAssistance, 
	dataForEventsTable,
	fillerTableDataTR,
	fillerTableDataTrII,
}