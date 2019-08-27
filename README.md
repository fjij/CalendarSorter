# CalendarSorter
Google Calendar Script. Sorts events from one master calendar into multiple sub-calendars based on their titles.

## Example
Separates events from one unsorted calendar into multiple calendars based on the event titles.
![Before](/Before.png) ![After](/After.png)

## Usage
Create a new Google Apps Script, then copy and paste the code from "Code.gs". Modify the `test()` function to suit your needs then run the `test()` function. 

### Source Calendar
Choose a calendar that contains all the events to be sorted. By default, the line `var sourceCalendar = CalendarApp.getCalendarsByName("Term 1 Classes Master List")[0];` chooses the first calendar with the title "Term 1 Classes Master List". This can be modified to any other title.

### Target Calendars 
Next, `targetCalendars` is an object populated with key/value pairs where the keys are strings of text and the values are calendars. If any of the events from the **Source Calendar** contain a key in their title, the event will be copied to the corresponding calendar. In the following code, the calendars are again selected by name.

```javascript
var targetCalendars = {
  "ABC 101": CalendarApp.getCalendarsByName("Class: English")[0],
  "ABC 132": CalendarApp.getCalendarsByName("Class: Speaking")[0],
  "ABC 152": CalendarApp.getCalendarsByName("Class: Writing")[0],
  "ASDF 102": CalendarApp.getCalendarsByName("Class: Typing")[0],
  "ZZZ 130": CalendarApp.getCalendarsByName("Class: Sleeping")[0]
};
```

### Start and End Times
Start and End Times are simply the times in between which the script will operate. Therefore, only events within this timeframe will be targeted. These variables are both regular JavaScript Date objects.
```javascript
var startTime = new Date(2019, 07, 27);
var endTime = new Date(2019, 07, 29);
```

### Delay
For some reason, Google Apps Scripts don't like it if you create too many events in too short of a time. For this reason, `var delay = 1000;` creates a 1000ms (1 second) delay after each event is created. You can tweak this number for to what works for you, but 1 second is a good starting point.
