// Setting variables to parse time data and display it
let currentDay = $("#currentDay").text(luxon.DateTime.local().toFormat("ff"));
let currentTime = parseInt(luxon.DateTime.local().toFormat("H"));
// This for loop appends each time built with the function "buildTimeSlot"
for (let i = 9; i < 18; i++) {
  $(".container").append(buildTimeSlot(i));
}
// This function build each time block row as well as sets its attributes
function buildTimeSlot(hour) {
  // Here is the creation of the row with its necessary classes
  const $timeSlot = $("<div>")
    .attr("id", "hour-" + hour)
    .attr("class", "row time-block hour");
// Here is the label for the rows
  const $timeLabel = $("<div>").attr("class", "col-md-1");
  // This if statement helped create the labels correctly marking hour and and period 
  if(hour > 12){
    $timeLabel.text(hour - 12 + "PM");
  }else if(hour === 12){
    $timeLabel.text(hour + "PM");
  }else {
    $timeLabel.text(hour + "AM");
  };
  // Here a text area was created to attatch our todo's
  const $textArea = $("<textarea>").attr("class", "col-md-10 description");
// This if else is used in conjunction with css to apply backgrounds that will colorcode the block based on time
  if (hour < currentTime) {
    $textArea.addClass("past");
  } else if(hour === currentTime){
    $textArea.addClass("present");
  } else if(hour > currentTime) {
    $textArea.addClass("present")
  }
  // This creates our save buttons at the end of each row
  const $btn = $("<button>")
    .attr("class", "btn saveBtn col-md-1")
    .append($("<i>").attr("class", "fas fa-save"))
    .data("block-hour", hour);
// This ties all of the creat elements together
  $timeSlot.append($timeLabel, $textArea, $btn);

  return $timeSlot;
}
// this for loop is used to retrieve stored data for each matching text-area
for (let i = 9; i < 18; i++) {
var renderTimeBlock = localStorage.getItem("timeblock-" + i.toString());
$(`#hour-${i} textarea`).text(renderTimeBlock);
}
// this on click function sets the added text in our text areas to variables that we can store
$(".time-block .btn").on('click', function(){
   var blockHour = $(this).data("block-hour");
   var blockText = $(`#hour-${blockHour} textarea`).val();
// and this sets those variables to storage
   localStorage.setItem(`timeblock-${blockHour}` , blockText);
 
});

