// can you create a clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

// HH:MM::SS (Eg. 13:45:23)

// HH:MM::SS AM/PM (Eg 01:45:23 PM)]

function fetchCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  //format to always show 2 digits
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  //24-hour format
  console.log(`Current machine time in  HH:MM::SS is: ${hh}:${mm}:${ss}`);

  //12-hour format with am/pm
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert to 12-hour format and handle 0 => 12
  const hh12 = String(hours).padStart(2, "0");

  console.log(
    `Current machine time in HH:MM::SS AM/PM is: ${hh12}:${mm}:${ss} ${period}`
  );
}

setInterval(fetchCurrentTime, 1000);
