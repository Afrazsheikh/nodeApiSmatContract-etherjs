const express = require('express');
const app = express();
const cors = require('cors');



const smartContractRoute  = require('./server/routes/smartcontract')
 app.use(cors());
app.use(express.json());

// if (typeof web3 !== 'undefined') {
//     var web3 = new Web3(web3.currentProvider);
// } else {
//     var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// }


// const accounts = await web3.eth.getAccounts();
// const contactList = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

app.use("/api", smartContractRoute);



app.listen(process.env.PORT || 3001, () => {
    console.log('listening on port ' + (process.env.PORT || 3001));
});