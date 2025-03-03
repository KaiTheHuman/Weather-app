//declare varaibles, get items from storage

var cityName="NULL";
var temperatureCelsius=0;
var humidity = 0;
var uvIndex=0;
var windSpeed=0;
var city = localStorage.getItem('city');
//localStorage.removeItem('city');
var celsius = localStorage.getItem('celsius');

//if celsuis not set, default to true (string form as local storage stores them in strings, keeps things unifrom)
if( celsius=== null)
{
    celsius="true";
}



//if city was declared in storage, then a city has already been set.
//fetch data and display it for set city using getWeatherData function
if(city)
{
    var city2 = parseInt(city);
    getWeatherData(city2)
}
//fetch weatherdata and display it
function getWeatherData(city){
    //fetch data from JSON file
    fetch("../sample.json")
    .then((response) => response.json())
    .then((data) => {

        //if theres a paragraph with ID city on page, set it to display city name
        if(document.getElementById("city"))
            {
                cityName= data[city].cityName;
                document.getElementById("city").innerText="City Name: "+cityName;
            }
    
            //if p with ID temp on page, set to correct temp
            if(document.getElementById("temp"))
            {
                temperatureCelsius= data[city].temperatureCelsius;
                //if temp >20, set icon to yellow, otherwise its blue
                if(temperatureCelsius>20)
                {
                    document.getElementById("tempIcon").style.fill="yellow";
                }
                else{
                    document.getElementById("tempIcon").style.fill="blue";
                }
    
                //if user has pressed C to F button, and therefore has set it so that they want to see F, instead of the default C
                //set temp to Ferenheight
                
                celsius = localStorage.getItem('celsius');
                if(celsius == "false")
                {
                    temperatureCelsius =  (temperatureCelsius * 1.8) + 32;
                    document.getElementById("temp").innerText="Tempurature: " + temperatureCelsius +" F ";
                    document.getElementById("CtoF").innerHTML="Change to Celsius";
                    celsius = localStorage.setItem('celsius',false);
    
                }
                else if(celsius == "true"){
                    //otherwise, display it in Celcuis
                    document.getElementById("temp").innerText="Tempurature: " + temperatureCelsius +" C ";
                    document.getElementById("CtoF").innerHTML="Change to Fahrenheit";
                    celsius = localStorage.setItem('celsius',true);
    
                }
                
            }
    
            //if p with ID humididty on page, set it to correct humidity
            if(document.getElementById("humidity")){
                humidity=data[city].humidity;
                document.getElementById("humidity").innerText="Humidity: " + humidity +"% ";
                //if humidity>0.5, set icon to blue, else its white
                if(humidity>0.5)
                    {
                        document.getElementById("humidityIcon").style.fill="blue";
                    }
                    else{
                        document.getElementById("humidityIcon").style.fill="white";
                    }
            }
    
            //if p with ID uv on page, set to correct UV index
            if(document.getElementById("uv"))
            {
                uvIndex=data[city].uvIndex;
                document.getElementById("uv").innerText="UV Index: "+uvIndex +" ";
    
                //if UV index>10, set icon to red, else yellow
                if(uvIndex>10)
                    {
                        document.getElementById("UVicon").style.fill="red";
                    }
                    else{
                        document.getElementById("UVicon").style.fill="yellow";
                    }
            }
    
            //if p with ID wind on page, set to correct wind speed
            if(document.getElementById("wind"))
            {
                windSpeed=data[city].windSpeed;
                document.getElementById("wind").innerText="Wind Speed: " +windSpeed;
                //if windspeed >20, set icon to blue. else white
                if(windSpeed>"20km")
                    {
                        document.getElementById("windIcon").style.fill="blue";
                    }
                    else{
                        document.getElementById("windIcon").style.fill="white";
                    }
            }

    });

    //now that all elements are set, check that we're on homePage

if(document.getElementById("homePage")){
    //set image to correct city
        switch(city) {
            case 0:document.getElementById("image").src="../images/Dublin.jpg"; break;
            case 1:document.getElementById("image").src="../images/New_York.jpg";break;
            case 2:document.getElementById("image").src="../images/Tokyo.jpg"; break;
            case 3:document.getElementById("image").src="../images/Sydney.jpg"; break;
            case 4:document.getElementById("image").src="../images/Berlin.jpg"; break;
            default:
          }
}
}

//Search function, translate with user wrote into one of the cities in JSON file
function Search(){
    //get input
    var s = document.getElementById("search").value;
//organise each city and some spellings,  to their numerbers, get weatherdata
    switch(s) {
        case "Dublin":
        case "dublin":
            localStorage.setItem('city', 0);
            getWeatherData(0); break;
        case "New York": 
        case "new york":
        case "NY":
        case "ny":
        localStorage.setItem('city', 1);
        getWeatherData(1);break;
        case "Tokyo":
        case"toyko": 
        localStorage.setItem('city', 2);
        getWeatherData(2); break;
        case "Sydney":
        case "sydney":
            localStorage.setItem('city', 3);
            getWeatherData(3); break;
        case "Berlin":
        case "berlin":
            localStorage.setItem('city', 4);
        getWeatherData(4); break;
        default:
            document.getElementById("info").innerHTML="City not in database, check spelling";
      }
    

}


//Celsuis to Ferhenheight (and vice versa) function 

function TempChange(){
    //get celsuis value, is it already set to F or not
    celsius = localStorage.getItem('celsius');

    //if temp is in celcuis, change to F
    if(city && celsius == "true" )
    {   
        //set celcius to false, for F
        localStorage.setItem('celsius', false);
        getWeatherData(city);
       
    }
    else if(city && celsius == "false")
    {
        //set celsius to true for C
        localStorage.setItem('celsius', true);
        getWeatherData(city);
    }
}


//function to get user Enter data using enter key

search.addEventListener("keypress", function(event) {
    //get input from search
    var input = document.getElementById("search");

    //if enter pressed
    if (event.key === "Enter") {

        //click searchButton
      document.getElementById("searchButton").click();
    }
  });