document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toLocaleString();
    }

    const resultsDiv = document.querySelector('#results');

    if (resultsDiv) {
        const myInfo = new URLSearchParams(window.location.search);

        resultsDiv.innerHTML = `
        <p>First Name: ${myInfo.get('firstname')}</p>
        <p>Last Name: ${myInfo.get('lastname')}</p>
        <p>Phone: ${myInfo.get('phone')}</p>
        <p>Email: ${myInfo.get('email')}</p>
        <p>Organization: ${myInfo.get('organization')}</p>
        <p>Submitted at: ${myInfo.get('timestamp')}</p>
    `;
    }

    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.classList.add('open');
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('open');
        });
    });

    document.getElementById("lastModified").textContent = document.lastModified;

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});