/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = '64b24582529c675c0f07918b3042d4a8';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?units=metric';
let zipCode = '94040';

const internalBaseURL = 'http://localhost:3000';
const getWeather = async (url = '', data = {})=>{
  const response = await fetch(url);
    try {
        // Transform into JSON
        const weatherData = await response.json()
        console.log(weatherData);
        return weatherData;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

const postJournal = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        return response.json();
    }catch(error) {
        console.log("error", error);
    }
};

const getJournal = async (url = '', data = {})=>{
    const response = await fetch(url);
    try {
        // Transform into JSON
        const journalData = await response.json()
        console.log(journalData);
        return journalData;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
const generateButton = document.getElementById('generate');
const zipCodeInput = document.getElementById('zip');
const userResponseInput = document.getElementById('feelings');
const mostRecentDate = document.getElementById('date');
const mostRecenTemp = document.getElementById('temp');
const mostRecentContent = document.getElementById('content');
generateButton.addEventListener('click',function (e){
    zipCode = zipCodeInput.value;
    getWeather(baseURL+'&zip='+zipCode+'&appid='+apiKey).then(function (weatherData){
        postJournal(internalBaseURL+'/project-data',{
            temperature: weatherData.list[0].main.temp,
            date: newDate,
            userResponse: userResponseInput.value
        }).then(function (data){
            getJournal(internalBaseURL+'/project-data').then(function (data){
               console.log(data);
               mostRecentDate.innerText = data.date;
               mostRecenTemp.innerText = data.temperature;
               mostRecentContent.innerText = data.userResponse;
            });
        });
    });
});