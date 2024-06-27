const express = require('express');
const app = express();
const port = 3000;

app.get('/time', (req, res) => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    res.json({ currentTime: formattedTime });
    return hours;
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
