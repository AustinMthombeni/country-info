
document.addEventListener("DOMContentLoaded",function(){
    const countryInput = document.getElementById("country");
    
    async function getMainCountryInfo() {


        const countryName = countryInput.value.trim();
        url = "https://restcountries.com/v3.1/name/"+countryName;
        try{

            const response = await fetch(url);
            const jsonObj = await response.json();
            console.log(jsonObj);
           
            if (jsonObj && jsonObj.length > 0) {
                handleCountryInfo(jsonObj);
            } else {
                alert("Please enter an existing country.");
                return;
            }
            

        }
        catch(error){
            console.warn("our error :",error);

        }

    }

    async function getBorderFlags(country){
        if(country == "nothing"){
            handleBorderFlags(country);
            return;
        }
        url = "https://restcountries.com/v3.1/alpha/"+country;
        try{
            const bordersResponse = await fetch(url);
            const bordersJSON = await bordersResponse.json();
            console.log(bordersJSON);

            handleBorderFlags(bordersJSON);

        }
        catch(error){
            console.warn("our error :",error);
        }
    }

    function handleCountryInfo(countryInfo) {
        let section = document.getElementById("country-info");

        if (!section) {
            section = document.createElement("section");
            section.id = "country-info";
            document.body.appendChild(section);

        }

        section.innerHTML = "";

        const flag = document.createElement("img");
        const ul = document.createElement("ul");

        const populationItem = document.createElement("li");
        populationItem.innerHTML = "Population: " + countryInfo[0].population;

        const capitalItem = document.createElement("li");
        capitalItem.innerHTML = "Capital: " + countryInfo[0].capital;

        const regionItem = document.createElement("li");
        regionItem.innerHTML = "Region: " + countryInfo[0].region;

        const source = countryInfo[0].flags.png;
        flag.src = source;
        flag.alt = "Image of country flag";

        const flagItem = document.createElement("li");
        flagItem.appendChild(document.createTextNode("Flag: "));
        flagItem.appendChild(flag);

        ul.appendChild(capitalItem);
        ul.appendChild(populationItem);
        ul.appendChild(regionItem);
        ul.appendChild(flagItem);
        section.appendChild(ul);

        if (countryInfo[0].borders && countryInfo[0].borders.length > 0) {
            for (let i = 0; i < countryInfo[0].borders.length; i++) {
                getBorderFlags(countryInfo[0].borders[i]);
            }
        } else {
            getBorderFlags("nothing");
        }
}


    function handleBorderFlags(borderCountryInfo) {
    let flagSection = document.getElementById("bordering-countries");

  
    if (!flagSection) {
        flagSection = document.createElement("section");
        flagSection.id = "bordering-countries";
        document.body.appendChild(flagSection);
        let bordersHeading = document.createElement("h4");
        bordersHeading.innerHTML = "Bordering countries: "
        flagSection.appendChild(bordersHeading)
    }

    if (borderCountryInfo === "nothing") {
        flagSection.innerText = "No borders";
        return;
    }

    const flagList = document.createElement("ul");

    const flag = document.createElement("img");
    flag.src = borderCountryInfo[0].flags.png;
    flag.alt = "Image of country flag";

    const borderFlagLabel = document.createTextNode(borderCountryInfo[0].name.common);

    const flagItem = document.createElement("li");
    flagItem.appendChild(borderFlagLabel);
    flagItem.appendChild(flag);

    flagList.appendChild(flagItem);
    flagSection.appendChild(flagList);
}
    document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const flagSection = document.getElementById("bordering-countries");
    const section = document.getElementById("country-info");

    if (flagSection) flagSection.innerHTML = "";
    if (section) section.innerHTML = "";

    getMainCountryInfo();
});

    

})



    
