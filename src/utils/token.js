var fs = require('fs');
const request = require('request')
const path = require('path')

const app_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIazdkbSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzk2MjAwMzAsImlhdCI6MTU3OTM2MDgzMCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.W9GJMWOb8DhNWR5JM1L0pM-LqOI3GSo_4KF1szPXsdO1Sks57UJAyWS22jOidwSTIY-NJI5ZCA1VJAysrsel7OEPJDV-9gP9gfwrnHAc6oBqVHWPPrdCDw_110f2S5447mGdz0XYgOqHidI3TWm6ErSgoJ69BK_pApq8koPub2OA5NvXU9EjLQtpL9aPHy-sqN3oS7AZQIx7wFdgKbqU5GGACVLrganM2thAZGDfFp9fX4s5vXXT3u-JtHzt7xV-y1VsG9sKQmFjN7JSov8UizpBl6t_8BF4TZ408vyX-VH4WfM-5Lx9Seic1RksW-WEQr4J0SY0AoQP7_nPVDU8ww'

const refresh_token = (user_id,project,taskname,start_date,callback) => {
    
    //const token = app_token
     
     const dataBuffer = fs.readFileSync('src/utils/token.json')
     const dataJSON = dataBuffer.toString()
     var token = JSON.parse(dataJSON)
     var token1 = token.refresh_token
     var grant='refresh_token'
     const apiUrl = 'https://account.hubstaff.com/access_tokens?grant_type='+grant+'&refresh_token='+token1;
        return new Promise ((resolve,reject)=> {
        request.post({url: apiUrl,json:true,'auth': {
            'username': 'x4Xs_mmT9wV6ii7Dk6J1tshRZkWN7tvFlEKe-1wIiuM',
            'password': 'j3G3AKD6d5VnRCns8Skw1n8jW-ldDJEXhdQKowtIPlk7FnoT2wS-ZEMPhKNMV72zlHxE-ETSPZCOlcRSKvOEVg',
        }} , (error, response) => {
         if (error) {
             resolve('Unable to connect to weather service')
         } else if(response.statusCode == 401){
             resolve('Authentication Needed')
         }
         else if(response.statusCode == 400){
             resolve('Invalid')
         }
          else if(response.statusCode == 201 || response.statusCode == 200) {
            
            
            token.access_token = response.body.access_token
            token.refresh_token = response.body.refresh_token
            const new_token = JSON.stringify(token)
            const tokenDirectoryPath = path.join(__dirname, '../src/utils')
            fs.writeFileSync(tokenDirectoryPath, new_token)
            resolve("Successfully Posted")             
         }
 
 
     })
 });
 }


const load = ()=>{
    const tokenDirectoryPath = path.join(__dirname, '../utils/token.json')

    const dataBuffer = fs.readFileSync(tokenDirectoryPath)
    const dataJSON = dataBuffer.toString()
    var token = JSON.parse(dataJSON)
    return token
}



module.exports = {app_token:app_token, load:load,refresh_token:refresh_token}