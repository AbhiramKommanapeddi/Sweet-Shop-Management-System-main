
const axios = require('axios');

async function checkImage() {
    try {
        const response = await axios.get('http://localhost:5000/images/bakery.png');
        console.log('Image reachable, status:', response.status);
    } catch (error) {
        console.error('Image not reachable:', error.message);
    }
}

checkImage();
