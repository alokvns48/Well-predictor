// Initialize a flag to track whether location coordinates have been obtained
let locationObtained = false;

// Function to make a prediction
function makePrediction(latitude, longitude) {
    // Check if location coordinates have been obtained
    if (!locationObtained) {
        alert('Please click "Get Location" to obtain location coordinates before predicting.');
        return null;
    }

    // Replace this with your actual prediction logic
    // For demonstration purposes, we're using a simplified object as the prediction:
    const prediction = {
        success: Math.random(), // Replace with your actual success probability
        level: Math.random() * 10, // Replace with your actual water level prediction in meters
        quality: 'Good', // Replace with your actual water quality prediction
        method: 'Drilling', // Replace with your actual drilling method prediction
    };

    // Convert water level from meters to feet
    prediction.levelFeet = prediction.level * 3.28084;

    return prediction;
}

// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude.toFixed(6);
                const longitude = position.coords.longitude.toFixed(6);
                document.getElementById('latitude').value = latitude;
                document.getElementById('longitude').value = longitude;
                document.getElementById('location').value = `${latitude}, ${longitude}`;
                locationObtained = true; // Set the flag to true when location is obtained
            },
            (error) => {
                console.error('Error getting location:', error.message);
                alert('Unable to retrieve location. Please enter manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please enter your location manually.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const predictButton = document.getElementById('predict-button');
    const getLocationButton = document.getElementById('get-location-button');

    predictButton.addEventListener('click', async () => {
        if (!locationObtained) {
            alert('Please click "Get Location" to obtain location coordinates before predicting.');
            return;
        }

        const latitudeInput = document.getElementById('latitude').value;
        const longitudeInput = document.getElementById('longitude').value;

        // Extract latitude and longitude from the input fields
        const latitude = parseFloat(latitudeInput);
        const longitude = parseFloat(longitudeInput);

        // Make the prediction request and update the result section
        const prediction = makePrediction(latitude, longitude);

        if (prediction !== null) {
            document.getElementById('result-success').textContent = `${prediction.success.toFixed(2)}`;
            document.getElementById('result-level').textContent = `${prediction.level.toFixed(2)}`;
            document.getElementById('result-level-feet').textContent = `${prediction.levelFeet.toFixed(2)}`;
            document.getElementById('result-quality').textContent = `${prediction.quality}`;
            document.getElementById('result-method').textContent = `${prediction.method}`;
        } else {
            document.getElementById('result-success').textContent = 'Error fetching prediction.';
            document.getElementById('result-level').textContent = 'Water Level (meters): -';
            document.getElementById('result-level-feet').textContent = 'Water Level (feet): -';
            document.getElementById('result-quality').textContent = 'Water Quality: -';
            document.getElementById('result-method').textContent = 'Drilling Method: -';
        }
    });

    getLocationButton.addEventListener('click', () => {
        getLocation(); // Call the getLocation function to get the user's current location
    });
});
