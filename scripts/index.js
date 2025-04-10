document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();

    document.getElementById("lastModified").textContent = "Last updated: " + document.lastModified;

    const courses = [
        {
            subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true, certificate: 'Yes', description: 'An intro course.', technology: []
        },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true, certificate: 'Yes', description: 'An intro course.', technology: [] },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true, certificate: 'Yes', description: 'An intro course.', technology: [] },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true, certificate: 'Yes', description: 'An intro course.', technology: [] },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true, certificate: 'Yes', description: 'An intro course.', technology: [] },
        { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false, certificate: 'Yes', description: 'An intro course.', technology: [] }
    ];

    const courseContainer = document.getElementById("course-container");
    const totalCredits = document.getElementById("total-credits");
    const courseDetails = document.getElementById("course-details");

    function displayCourses(filter) {
        courseContainer.innerHTML = "";
        let filteredCourses = filter === 'all' ? courses : courses.filter(course => course.subject === filter);
        let total = 0;

        filteredCourses.forEach(course => {
            total += course.credits;
            let courseElement = document.createElement("div");
            courseElement.classList.add("course-card", course.completed ? "completed" : "not-completed");
            courseElement.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title} - ${course.credits} credits</p>`;
            if (course.completed) {
                courseElement.classList.add("completed");
            }
            courseElement.addEventListener('click', () => {
                displayCourseDetails(course);
            });
            courseContainer.appendChild(courseElement);
        });
        totalCredits.textContent = total;
    }

    window.filterCourses = displayCourses;
    displayCourses('all');

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("animateme");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("open");
    });

    function displayCourseDetails(course) {
        courseDetails.innerHTML = '';
        courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
        courseDetails.showModal();

        const closeModal = document.getElementById("closeModal");

        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
    }
});