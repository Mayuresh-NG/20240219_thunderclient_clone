
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

function sendRequest() {
    const apiUrl = document.getElementById('textbox3').value;

    fetch(apiUrl, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display the result on the webpage with colored keys and values
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = formatJson(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error.message);
        });
}

// Function to format JSON with colored keys and values
function formatJson(data) {
    return '<pre>' + syntaxHighlight(JSON.stringify(data, null, 2)) + '</pre>';
}

// Function to apply syntax highlighting
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); // Escape special characters
    return json.replace(/("(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
}


document.addEventListener('DOMContentLoaded', function () {
    // Get references to the textboxes
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    const textbox3 = document.getElementById('textbox3');

    // Add an input event listener to both textbox1 and textbox2
    textbox1.addEventListener('input', updateTextbox3);
    textbox2.addEventListener('input', updateTextbox3);

    // Function to update textbox3 with the combined values
    function updateTextbox3() {
        textbox3.value = "http://localhost:3000/api/" + "?" + textbox1.value + "=" + textbox2.value;
    }
});
