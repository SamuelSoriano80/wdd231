document.addEventListener("DOMContentLoaded", () => {
    const gridViewBtn = document.getElementById("gridView");
    const listViewBtn = document.getElementById("listView");
    const directory = document.getElementById("directory");

    gridViewBtn.addEventListener("click", () => {
        directory.classList.remove("list-view");
        directory.classList.add("grid-view");
    });

    listViewBtn.addEventListener("click", () => {
        directory.classList.remove("grid-view");
        directory.classList.add("list-view");
    });

    fetch("members.json")
        .then(response => response.json())
        .then(data => {
            displayMembers(data.members);
        })
        .catch(error => console.error("Error loading members:", error));

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach(member => {
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

    document.getElementById("lastModified").textContent = document.lastModified;

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});