const inputvalue=document.querySelector("#search_text");
const cityname=document.getElementById("city");
const day=document.getElementById("day");
const temp=document.getElementById("tempmain");
const button=document.getElementById("find_btn");
const humidity=document.getElementById("humidity");
const wind_kph=document.getElementById("wind_kph");
button.addEventListener("click",()=>{
    locationdata();
        inputvalue.value="";
})

let city="";
inputvalue.addEventListener('change',()=>{
    city=inputvalue.value;
});


const locationdata=async()=>{
    try{
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=468e8ea0c27d4095aba104128243101&q=${city}&aqi=yes`);
        const data=await response.json();
        if(data.location){
            cityname.innerText=data.location.name+" "+data.location.country;
            day.innerText=data.location.localtime.split(' ').reverse().join();
            temp.innerText=data.current.temp_c;
            humidity.innerText=data.current.humidity;
            wind_kph.innerText=data.current.wind_kph;
        }
        else{
            cityname.innerText="City Not Found";
        }
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}
