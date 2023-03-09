const dotenv = require('dotenv');
const prompt = require('prompt-sync')();
const axios = require('axios');
dotenv.config();

const { API_KEY } = process.env;

const convert = async (from, to, amount) => {
    const URL = `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`;
    try {
        const { data } = await axios.get(URL, { headers: { 'apiKey': API_KEY }});

        
        console.log('\n##############################################################');
        if (data.success) {
            console.log(`${amount} in ${from} equals to ${data.result} in ${to}`);
        } else {
            console.log(`Converting ${amount} from ${from} to ${to} failed. Try again later!`);
        }

        console.log('\n##############################################################');
    } catch (e) {
        console.log(e);
    }
}

const takeInput = () => {
    const data = {};
    data.from = prompt('Enter the currency to convert from: ');
    data.to = prompt('Enter currency to convert to: ');
    data.amount = prompt('Enter the amount you want to convert: ');

    return data;
}

(async () => {
    const inputData = takeInput();
    await convert(inputData.from, inputData.to, inputData.amount);
})();