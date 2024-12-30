document.getElementById('submit-btn').addEventListener('click', async () => {
    const newsText = document.getElementById('news-text').value;
    const resultDiv = document.getElementById('result');

    // Clear previous result
    resultDiv.classList.add('hidden');
    resultDiv.textContent = "";

    if (!newsText.trim()) {
        resultDiv.textContent = "Please enter some text.";
        resultDiv.classList.remove('hidden');
        return;
    }

    try {
        // Send a POST request to Flask API
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texts: [newsText] })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
        } else {
            const prediction = data.results[0].prediction;
            resultDiv.textContent = `Prediction: ${prediction}`;
        }
    } catch (error) {
        resultDiv.textContent = `Error: Unable to connect to the server.`;
    }

    resultDiv.classList.remove('hidden');
});
