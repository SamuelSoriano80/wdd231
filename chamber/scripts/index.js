document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");

    fetch("members.json")
        .then(response => response.json())
        .then(data => {
            displayMembers(data.members);
        })
        .catch(error => console.error("Error loading members:", error));

    function displayMembers(members) {
        directory.innerHTML = "";
        const goldSilverMembers = members.filter(member => member.membership === 2 || member.membership === 3);
        const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);

        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" width="500">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">${getMembershipLevel(member.membership)}</p>
        `;
            directory.appendChild(card);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            case 1: return "Member";
            default: return "Affiliate";
        }
    }

    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const weatherDesc = document.querySelector('#weather-description');
    const forecast1 = document.querySelector('#forecast1');
    const forecast2 = document.querySelector('#forecast2');
    const forecast3 = document.querySelector('#forecast3');

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=16.77&lon=-3.01&units=metric&appid=cc4eba568f2d3a8171c26bb5fe7b4c89';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=16.77&lon=-3.01&units=metric&cnt=3&appid=cc4eba568f2d3a8171c26bb5fe7b4c89';

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayResults(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getForecastData() {
        try {
            const response = await fetch(forecastUrl);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayForecast(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    getForecastData();

    apiFetch();

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    function displayResults(data) {
        currentTemp.innerHTML = `${data.main.temp}&deg;C`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        weatherDesc.textContent = `${titleCase(desc)}`;
    }

    function displayForecast(data) {
        forecast1.innerHTML = `Today: ${data.list[0].main.temp}&deg;C`;
        forecast2.innerHTML = `Tomorrow: ${data.list[1].main.temp}&deg;C`;
        forecast3.innerHTML = `The day after tomorrow: ${data.list[2].main.temp}&deg;C`;
    }

    document.getElementById("lastModified").textContent = document.lastModified;

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});