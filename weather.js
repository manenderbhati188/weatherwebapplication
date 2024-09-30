const inputvalue=document.querySelector("#search_text");
const cityname=document.getElementById("city");
const day=document.getElementById("day");
const temp=document.getElementById("tempmain");
const button=document.getElementById("find_btn");
const humidity=document.getElementById("humidity");
const wind_kph=document.getElementById("wind_kph");
const pathimage=document.getElementById("pathimage");
const currentlocation=document.getElementById("currentlocation");
const images_wheather=document.getElementById("wheather_img");

let wheather="";
const wheatherimg={
    "sunny":"http://wallpapercave.com/wp/2khKQyP.jpg",
    "rain":"https://wallpaperaccess.com/full/164284.jpg",
    "summer":"https://getwallpapers.com/wallpaper/full/f/9/3/705058-wallpaper-summer-1920x1080-windows-10.jpg",
    "windy":"https://getwallpapers.com/wallpaper/full/f/9/3/705058-wallpaper-summer-1920x1080-windows-10.jpg",
    "stormy":"https://tse2.mm.bing.net/th?id=OIP.PylD5wxZ84TgeA79gPYdpwHaE4&pid=Api&P=0&h=220",
    "mist":"http://www.zastavki.com/pictures/originals/2014/Nature___Seasons___Spring_Sunny_weather_in_the_spring_067863_.jpg"
}


let city="";

const getlocation=async(location)=>{
    const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=468e8ea0c27d4095aba104128243101&q=${location.coords.latitude},${location.coords.longitude}&aqi=yes`);
    let data=await response.json();
    console.log(data);
    city=data.location.name;
    locationdata(city);
}
const notgetlocation=async ()=>{
    console.log("Location Not Found");
}
currentlocation.addEventListener('click',()=>{
    const result=navigator.geolocation.getCurrentPosition(getlocation,notgetlocation);
    
})

button.addEventListener("click",()=>{
    locationdata(city);
    inputvalue.value="";
})

inputvalue.addEventListener('change',()=>{
    city=inputvalue.value;
});


const locationdata=async(city)=>{
    try{
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=468e8ea0c27d4095aba104128243101&q=${city}&aqi=yes`);
        const data=await response.json();
    
        if(data.location){
            cityname.innerText=data.location.name+" "+data.location.region+" "+data.location.country;
            day.innerText=data.location.localtime.split(' ').reverse().join();
            temp.innerText=data.current.temp_c;
            humidity.innerText=data.current.humidity;
            wind_kph.innerText=data.current.wind_kph;
            wheather=data.current.condition.text;
            {
                Object.entries(wheatherimg).map(([key,value])=>{
                    if(key==wheather.toLowerCase()){
                        images_wheather.setAttribute('src',value);
                        console.log(images_wheather);
                    }
                })
            }
            
        }
        else{
            cityname.innerText="City Not Found";
        }
    }
    catch(err){
        console.log(err);
    }
}
