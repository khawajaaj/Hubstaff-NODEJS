const request = require("request")
const forecast = (langtitude,longitude,callback)=>{

const forecastUrl = 'https://api.darksky.net/forecast/fe85ae13b16755e71b42dbfa2eb2ad86/'+langtitude+','+longitude +'?units=si'

request({url:forecastUrl,json:true},(error,response)=>{

    if(error){
        callback("Unable to connect to network")
    }
    else if(response.body.error){
        callback("Unable to Find your location")
    }
    else{
        callback(undefined, response.body.daily.data[0].summary + "It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain" )
    }

})
}

module.exports = forecast
