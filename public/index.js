let output=document.getElementById('output');
output.style.display='none';
let msg=document.getElementById('msg');
const btn = document.getElementById('btn');

   const getdata = async (e) => {
       e.preventDefault();
       const city = document.getElementById('from_data').city_name.value;

       if(city==''){
        msg.innerHTML='Please enter City name...'
       }else{
       const apiKey = 'ecfa15923c9b4c99979f7c3eb9dc8087';
       const url = `https://api.opencagedata.com/geocode/v1/json?q=${(city)}&key=${apiKey}`;

       try {
           const response = await fetch(url);
           const data = await response.json();

           if (data.status.code === 200 && data.results.length > 0) {
               const location = data.results[0].geometry;
               const lat = location.lat.toFixed(2);
               const lng = location.lng.toFixed(2);

          const api_data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=ad6963e5d89dede8e8cd1e13bcf981c5`;
         
           try{
           const response = await fetch(api_data);
           const city_data = await response.json();
           console.log(city_data);
           let temp=(city_data.main.temp-273.15).toFixed(2);
           let city_name=city_data.name;
           let country_name=city_data.sys.country;
           let statuscode=city_data.weather[0].main;

           console.log(statuscode);
           

           let city=document.getElementById('city');
           city.innerHTML=city_name+","+country_name;

           let temprature=document.getElementById('temprature');
           temprature.innerHTML=temp+"°C";

           let weathercon=document.getElementById('condition');

               if(statuscode=="Sunny"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-sun' style='color:#eccc68'></i>";
               }else if(statuscode=="Clouds"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-cloud' style='color:#f1f2f6'></i>";
               }else if(statuscode=="Rain"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-cloud-rain' style='color:#a4b0be'></i>";
               }else if(statuscode=="Clear"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-sun' style='color:#eccc68'></i>";
               }else if(statuscode=="Smoke"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-smog' style='color:#a4b0be'></i>";
               }else if(statuscode=="Haze"){
                   weathercon.innerHTML="<i class='fas fa-solid fa-smog' style='color:#a4b0be'></i>";
               }
               else{
                   weathercon.innerHTML=`<i class="fas fa-moon" style="color: #f1f2f6;"></i>`;
               }
               output.style.display='block';
               msg.style.display='none';
           }catch{
               console.log('error1');
           }

           } else {
               msg.innerHTML = 'Please enter valid city name...';
               output.style.display='none';
               msg.style.display='flex';
           }
       } catch (error) {
           msg.innerHTML = 'Please enter valid city name...';
           output.style.display='none';
           msg.style.display='flex';
       }
       }
   };

   btn.addEventListener('click', getdata);