
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('nav a');
    const containers = document.querySelectorAll('.link-container');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Find the index of the clicked link
            const clickedIndex = Array.from(links).indexOf(link);

            // Add/remove 'active' class to the clicked link
            links.forEach((el) => el.classList.remove('active'));
            link.classList.add('active');

            // Toggle visibility of the corresponding container
            containers.forEach((container, containerIndex) => {
                container.style.display = containerIndex === clickedIndex ? 'block' : 'none';
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchParam = encodeURIComponent('samsung');

    // Construct the URL with the search parameter
    const apiUrl = `http://localhost:3000/api/search?searchParam=${searchParam}`;

    // Fetch API call to your Express server endpoint with the search parameter
    fetch(apiUrl, { method: 'GET' })  
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error.message);
        });
});
