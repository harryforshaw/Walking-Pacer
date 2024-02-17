Walking Pacer app was built in various stages:

**Stage 1 - Starter Calculator:**

Add 11 buttons with labels 0 1 2 3 4 5 6  8 9 plus C and ⇦ (left arrow UTF).

Make the numbers work as input for both time and distance:

Make both input paragraphs start showing the number 0 on first run

When the user taps on an "input" paragraph: highlight it as current paragraph by adding a | carat cursor to the end of the paragraph. Move this when the user taps the other input field, start with the distance paragraph highlighted on page load;

When the user taps on a numeric button: add that number to the currently active field (before the |).

When the user taps on C: set the currently selected field value to zero.

When the user taps on ⇦: remove the rightmost digit from the currently selected field (setting it to zero if no digits remain).

Limit the distance field to up to five digits (e.g. max 99999 metres) and the time field to a maximum of three digits (e.g. max 999 minutes).

Show the calculation of pace in minutes per kilometre (whole number mins/km, e.g. "17 mins/km"). When the input distance >= 10 and minutes >= 5 show the pace calculation as the user inputs to the distance and time fields. When the distance or time is too short, show the pace simply as --

Finally, remember the inputs between visits to the page so that when a user returns they see their last inputs and can edit those values.

**Stage 2 - Live Average Pace/Distance:**

After the user has pressed start change the start button to stop then show:

The distance the user has walked from start location by using GPS / location sensors. Initially do this as "the crow flies" distance from start location to current location, then update to a more accurate distance taking into account corners and loops. You may want to use Haversine formula to calculate distance between two locations.

The user's average walking pace for the walk so-far, in mins/km.

Stop tracking and set the button back to start when the user taps stop.

**Stage 3 - Incline Measurement:**

On load show the prompt to tap. When the user taps, show the incline in this field for 30 seconds before returning to the prompt. When shown the text should be "◬ Incline: 13% uphill (7°) ◬" or "◬ Incline: 10% downhill (-6°) ◬". You will need to convert from degrees to % (the values here are correct conversions). 

