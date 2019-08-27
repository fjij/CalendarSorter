function sortCalendar(sourceCalendar, targetCalendars, startTime, endTime, delay) {
  // get all events from source calendar
  var events = sourceCalendar.getEvents(startTime, endTime);
  
  // loop through all events
  for (var i = 0; i < events.length; i ++) {
    var event = events[i];
    // check title of event
    var title = event.getTitle();
    // check all the course keys for matches
    for (var key in targetCalendars) {
      /*
        For some reason string.includes(substring) doesn't work
        with google scripts so we do this instead:
      */
      if (title.indexOf(key) > -1) { 
        // if the title contains the key, copy the event into the right calendar
        var calendar = targetCalendars[key];
        calendar.createEvent(
          title,
          event.getStartTime(),
          event.getEndTime(),
          {
            description: event.getDescription(), 
            location: event.getLocation()
          }
        );
        
        /*
          Pause for a delay so we don't get the ol'
          "You have been creating or deleting too many calendars or
          calendar events in a short time. Please try again later."
          error
        */
        Utilities.sleep(delay);
        break;
      }
    }
  }
}

function test(){
  // example usage for classes
  
  var sourceCalendar = CalendarApp.getCalendarsByName("Term 1 Classes Master List")[0];
  var targetCalendars = {
    //"Key": targetCalendar
    "ABC 101": CalendarApp.getCalendarsByName("English")[0],
    "ABC 132": CalendarApp.getCalendarsByName("Speaking")[0],
    "ABC 152": CalendarApp.getCalendarsByName("Writing")[0],
    "ASDF 102": CalendarApp.getCalendarsByName("Typing")[0],
    "ZZZ 130": CalendarApp.getCalendarsByName("Sleeping")[0]
  };
  
  // september 1st 2019 to december 31st 2019
  var startTime = new Date(2019, 08, 01); // months count from zero??
  var endTime = new Date(2019, 11, 31);
  
  // delay in ms between events created
  var delay = 1000;
  
  // Call sortCalendar
  sortCalendar(sourceCalendar, targetCalendars, startTime, endTime, delay);
}
