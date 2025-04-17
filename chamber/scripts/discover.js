import { places } from '../data/places.mjs'
console.log(places)

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("lastModified").textContent = document.lastModified;

    const container = document.querySelector('#cards-container');

    places.forEach(place => {
        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');

        // Title
        const title = document.createElement('h2');
        title.textContent = place.name;

        // Image
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.name;
        figure.appendChild(img);

        // Address
        const address = document.createElement('address');
        address.textContent = place.address;

        // Description
        const desc = document.createElement('p');
        desc.textContent = place.description;

        // Button
        const button = document.createElement('button');
        button.textContent = 'Learn More';

        // Append elements to card
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        // Append card to container
        container.appendChild(card);
    });

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});