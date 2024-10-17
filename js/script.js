<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Automatic Theme Change</title>
</head>
<body id="body">

    <h1> Aitzaz Web !</h1>
    <button id="toggle-theme">Change Theme</button>

    <script src="script.js"></script>
</body>
</html>
const body = document.getElementById('body');
const button = document.getElementById('toggle-theme');

// Function to change theme
function changeTheme() {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) { // checking if current time is evening or night
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
}

// Initial theme change based on time
changeTheme();

// Optional: Add event listener to toggle theme manually
button.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
});
