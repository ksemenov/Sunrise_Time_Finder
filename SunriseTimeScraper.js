
// sunrise data will be scrapped from this website
let website = 'https://www.timeanddate.com/sun/';

let country;
let city;

// we will filter the scrapped data according to this regexp
let reg = /Sunrise Today: <\/span><span class=three>(\d+:\d+ am)<\/span>/;

function formatLocation(data){
  // converts to an array []"county", "city"]
  let location = data.toLowerCase().split(", ").map(value => value.replace(" ", "-"));
  return location;
}

document.querySelector("button").addEventListener("click", function() {
  let location = formatLocation(document.querySelector("#placeInput").value);
  country = location[0];
  city = location[1];

  // formatted url to include country and city variables
  let url= website + country + "/" + city;

  // gets information from the URL and updates it on the website
  $.get('https://api.allorigins.ml/get?method=raw&url=' + encodeURIComponent(url) + '&callback=?', function(data){
      let time = data.match(reg)[1];
      let response = document.querySelector("#response");
      response.textContent = "Sunrise is at " + time;
      response.style.visibility = "visible";
  });
});
