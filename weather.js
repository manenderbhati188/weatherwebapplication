const inputvalue=document.querySelector("#search_text");
const cityname=document.getElementById("city");
const day=document.getElementById("day");
const temp=document.getElementById("tempmain");
const button=document.getElementById("find_btn");
const humidity=document.getElementById("humidity");
const wind_kph=document.getElementById("wind_kph");
const pathimage=document.getElementById("pathimage");
const currentlocation=document.getElementById("currentlocation");
const image=document.getElementById("image_create");
const img2=document.getElementById("create_img2");
const img3=document.getElementById("create_img3");
const temp1=document.getElementById("temp1");
const temp2=document.getElementById("temp2");
let day1=document.getElementById("day1");
let day2=document.getElementById("day2");
const wheather_img1=document.getElementById("wheather_img1");
const humidity1=document.getElementById("humidity1");
const wind1=document.getElementById("wind1");
const humidity2=document.getElementById("humidity2");
const wind2=document.getElementById("wind2");

let wheather="";
let city="";
let arr=[];

const getlocation=async(location)=>{
    const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=468e8ea0c27d4095aba104128243101&q=${location.coords.latitude},${location.coords.longitude}&aqi=yes`);
    let data=await response.json();
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

    const city=inputvalue.value.trim();
    if(city===""){
        alert("Please Enter City");
        return;
    }
    locationdata(city);
    inputvalue.value="";

})

inputvalue.addEventListener('change',()=>{
    city=inputvalue.value;
});


const locationdata=async(city)=>{
    try{
        const response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=468e8ea0c27d4095aba104128243101&q=${city}&days=3&aqi=no&alerts=no`);
        const data=await response.json();
    
        if(data.location){
            cityname.innerText=data.location.name+" "+data.location.region+" "+data.location.country;
            temp.innerText=data.current.temp_c;
            humidity.innerText=data.current.humidity;
            wind_kph.innerText=data.current.wind_kph;
            wheather=data.current.condition.text;
            let days=data.forecast.forecastday;
            Object.entries(days).map(([key,value])=>{
                if(key==0){
                    day.innerText=value.date;
                    const img=document.createElement("img");
                    img.setAttribute('src','http://wallpapercave.com/wp/2khKQyP.jpg');
                    image.appendChild(img);
                    value.day.avghumidity;
                }
                if(key==1){
                    day1.innerText=value.date;
                    temp1.innerText=value.day.avgtemp_c;
                    const img=document.createElement("img");
                    img.setAttribute('src','https://getwallpapers.com/wallpaper/full/f/9/3/705058-wallpaper-summer-1920x1080-windows-10.jpg');
                    img2.appendChild(img);
                    humidity1.innerText=value.day.avghumidity;
                    wind1.innerText=value.day.maxwind_kph;
                }
                if(key==2){
                    day2.innerText=value.date;
                    temp2.innerText=value.day.avgtemp_c;
                    const img=document.createElement("img");
                    img.setAttribute('src','https://tse2.mm.bing.net/th?id=OIP.PylD5wxZ84TgeA79gPYdpwHaE4&pid=Api&P=0&h=220');
                    img3.appendChild(img);
                    humidity2.innerText=value.day.avghumidity;
                    wind2.innerText=value.day.maxwind_kph;
                }
            })
            
        }
        else{
            cityname.innerText="Invalid City";
        }
    }
    catch(err){
        console.log(err);
    }
}
