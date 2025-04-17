import { places } from '../data/places.mjs'
console.log(places)

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("lastModified").textContent = document.lastModified;

    const container = document.querySelector('#cards-container');

    places.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = place.name;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.name;
        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = place.address;

        const desc = document.createElement('p');
        desc.textContent = place.description;

        const button = document.createElement('button');
        button.textContent = 'Learn More';

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        container.appendChild(card);
    });

    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = Number(lastVisit);
        const timeDiff = currentVisit - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // ms to days

        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});