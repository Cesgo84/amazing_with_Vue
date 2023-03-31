async function getEventsData() {
    let data = await fetch('../../back/amazing.json')
    .then(response => response.json())
    .then(data => {
        const events = data.events;
        const currentDate = data.currentDate; 
        let eventsStatistics = document.getElementById('events-stats-body');
        let upcomingStatistics = document.getElementById('upcoming-stats-body');
        let pastStatistics = document.getElementById('past-stats-body');

        fillerTableDataTR(eventsStatistics,dataForEventsTable(events));
        fillerTableDataTrII(upcomingStatistics,dataForTablesUpcomingAndPast(events,upcomingEvents,currentDate));
        fillerTableDataTrII(pastStatistics,dataForTablesUpcomingAndPast(events,pastEvents,currentDate));

  	    return data;
    }).catch ((error) => console.error(error)) 
    // console.log(data);
}
getEventsData();

import {dataForEventsTable, upcomingEvents, pastEvents, fillerTableDataTR, fillerTableDataTrII, dataForTablesUpcomingAndPast} from './functions.js';


