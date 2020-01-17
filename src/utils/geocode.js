const request = require('request')


 const geocode= (address,callback)=>{

    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYWppc2dvb2QiLCJhIjoiY2s0bTlncnFzMHMydTNvbjV0ZjZ4bjJhdiJ9.Tohv29hv4HuMeZ-E6RobVQ'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service')
        }
        else if(response.body.features.length ===0){
            callback("Unable to find your location")
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude :response.body.features[0].center[0],
                location  :response.body.features[0].place_name
            })
        }


    })

 }

 module.exports = geocode