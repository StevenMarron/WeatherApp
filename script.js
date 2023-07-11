var input = document.getElementById("weatherSearch")
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        document.getElementById("search-button").click();
    }
})

async function latLonAPI(){
    // console.log("search pressed")
    searchCity=document.getElementById("weatherSearch").value.toLowerCase()
    api_key="b0c52cc76ab9de88a3a020abae2f22c7"
    url=`http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${api_key}`
    // config={
    //     method:'GET',
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     referrer: 'no-referrer',
    //     // mode: 'no-cors'
    // }
    clearSearchError()
    if(searchCity){
        await fetch(url)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Something's wrong, I can feel it")
                throw new Error ("NETWORK RESPONSE ERROR");
            }
        }).then(function(data){
            if(data.length > 0){
                console.log(data[0])
                const searchBox=document.getElementById("weatherSearch")
                searchBox.value=""
                const weatherDiv=document.getElementById("weatherResults")
                weatherDiv.innerHTML=""
                const location=document.createElement('h1')
                location.innerText=data[0].name+", "+data[0].country
                weatherDiv.appendChild(location)
                weatherAPI(data)                
            }
            else{
                console.error("No Results Found")
                const searchBox=document.getElementById("searchForm")
                const errorSearch=document.createElement('p')
                errorSearch.innerText="No Results Found"
                errorSearch.classList.add("searchError")
                searchBox.appendChild(errorSearch)
            }


        })        
    }
    else{
        console.error("No Search Input")
        const searchBox=document.getElementById("searchForm")
        const errorSearch=document.createElement('p')
        errorSearch.innerText="please input a location"
        errorSearch.classList.add("searchError")
        searchBox.appendChild(errorSearch)
    }
}

async function weatherAPI(data){
    const lat=data[0].lat
    const lon=data[0].lon
    api_key="b0c52cc76ab9de88a3a020abae2f22c7"
    url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    
    await fetch(url)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error ("COULDN'T GET DATA")
        }
    }).then(function(data){
        console.log(data)
        const weatherDiv=document.getElementById("weatherResults")
        const temp=document.createElement('h2')
        temp.innerText=data.main.temp +"\u00B0C"
        const icon=document.createElement('img')
        icon.src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        icon.classList.add("result-icon")
        weatherDiv.appendChild(temp)
        weatherDiv.appendChild(icon)
    })
}

function clearSearchError(){
    const searchError=document.getElementsByClassName("searchError")
    if(searchError.length >= 1 ){
     searchError[0].remove()   
    }
}
