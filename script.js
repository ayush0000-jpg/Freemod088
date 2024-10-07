async function fetchIssueNumber() {
    try {
        const response = await fetch('https://api.bdg88zf.com/api/webapi/GetGameIssue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzIzNDYzNjk3IiwibmJmIjoiMTcyMzQ2MzY5NyIsImV4cCI6IjE3MjM0NjU0OTciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI4LzEyLzIwMjQgNTo1NDo1NyBQTSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFjY2Vzc19Ub2tlbiIsIlVzZXJJZCI6IjI1OTIzNzAiLCJVc2VyTmFtZSI6IjkxODc5OTMwNjIwNiIsIlVzZXJQaG90byI6IjYiLCJOaWNrTmFtZSI6Ik1lbWJlck5OR001WlNJIiwiQW1vdW50IjoiMC44MyIsIkludGVncmFsIjoiMCIsIkxvZ2luTWFyayI6Ikg1IiwiTG9naW5UaW1lIjoiOC8xMi8yMDI0IDU6MjQ6NTcgUE0iLCJMb2dpbklQQWRkcmVzcyI6IjI0MDk6NDA4MDo5ZDBjOmNkODg6Y2JmZTpjYTUwOjc2NWQ6MjRjNyIsIkRiTnVtYmVyIjoiMCIsIklzdmFsaWRhdG9yIjoiMCIsIktleUNvZGUiOiIxMzIiLCJUb2tlblR5cGUiOiJBY2Nlc3NfVG9rZW4iLCJQaG9uZVR5cGUiOiIwIiwiVXNlclR5cGUiOiIwIiwiVXNlck5hbWUyIjoiIiwiaXNzIjoiand0SXNzdWVyIiwiYXVkIjoibG90dGVyeVRpY2tldCJ9.669hgCPU3bBWbRX76qBLPzFNN8gpBbbVxO5yGNr9sik'
            },
            body: JSON.stringify({
                typeId: 1,
                language: 0,
                random: "3547ce895ed145f2a2582e9a0fe52915",
                signature: "6B46CD44931F8B301A7C03EE49B0A905",
                timestamp: 1723463759
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.code !== 0) {
            throw new Error(`API error! code: ${data.code}, message: ${data.msg}`);
        }

        const issueNumber = data.data.issueNumber;
        document.getElementById('issueNumber').textContent = issueNumber;
        predictRandom(issueNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('issueNumber').textContent = 'Error loading data';
        document.getElementById('prediction').textContent = 'Prediction error';
    }
}

function predictRandom(issueNumber) {
    try {
        const lastDigit = parseInt(issueNumber.slice(-1), 10);
        if (isNaN(lastDigit)) {
            throw new Error('Invalid issue number format');
        }
        const prediction = lastDigit % 2 === 0 ? 'BIGGG' : 'SMALL';
        const predictionElement = document.getElementById('prediction');
        predictionElement.textContent = prediction;
        predictionElement.className = 'value ' + (prediction.toLowerCase());
    } catch (error) {
        console.error('Error in prediction:', error);
        document.getElementById('prediction').textContent = 'Prediction error';
    }
}

// Fetch issue number when the page loads
fetchIssueNumber();
