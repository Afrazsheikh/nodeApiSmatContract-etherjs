const { ethers } = require("ethers");

const CONTRACT_ABI = require('../config/config.json');
// const CONTRACT_ADDRESS = require('../config/config')
const instance = require('../config/config')
const { check, validationResult } = require("express-validator");
const { Console } = require("console");
//ipfs
// const ipfsAPI  = require('ipfs-api')


const CONTRACT_ADDRESS = '0x61a49b2084fd3Cec9cAd918B231AfC856f561D5B';
let provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
let privatekey = "Private key"


// //connecting to the ipfs network 
// const ipfs = ipfsAPI('ipfs', 4001,{protocol : 'https'})
// //Reading file from computer
// let testFile = fs.readFileSync("PATH_OF_FILE");
// //Creating buffer for ipfs function to add file to the system
// let testBuffer = new Buffer(testFile);

// // exports.ipfs = async(req, res) => { 

//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             error: errors.array()[0].msg,
//             status: 422
//         });
//     }
// }

// try {
//     const reader = new FileReader();
//     reader.onloadend = function() {
//         const ipfs = IpfsApi('ipfs', 4001,{protocol : "http"}) 
//         const buf = buffer.Buffer(reader.result)
//     }
//     // const { userName, _RSA_Public_Key } = req.body;
//     // console.log(req.body);

//     // let wallet = new ethers.Wallet(privatekey, provider);
//     // let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
//     // const create = await instance.createAccount(userName, _RSA_Public_Key)



//     return res.status(200).json({
//         status: 200,
//         success: true,
//         message: "User successfully created",
//     });
// } catch (error) {
//     return res.status(500).json({
//         error: error.message,
//         status: 500
//     });
// }

// signup function
exports.register = async (req, res) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            status: 422
        });
    }
    try {
        const { userName, _RSA_Public_Key } = req.body;
        console.log(req.body);

        let wallet = new ethers.Wallet(privatekey, provider);
        let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
        const create = await instance.createAccount(userName, _RSA_Public_Key)


        return res.status(200).json({
            status: 200,
            success: true,
            message: "User successfully created",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            status: 500
        });
    }
};
exports.findUser = async (req, res) => {
    const errors = validationResult(req)
    console.log("a===============");
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            status: 422
        });
    }
    console.log("b============");
    try {
        const { userName } = req.body;
        console.log("c===============");
        let wallet = new ethers.Wallet(privatekey, provider);
        let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
        const find = await instance.findUser(userName)
        console.log("b============",find);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "User found ",
        });



    } catch (error) {
        return res.status(500).json({
            error: error.message,
            status: 500
        });
    }

};
exports.sendMessage = async (req, res) => {
    const errors = validationResult(req)
    console.log("a==============sendMessage=");
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            status: 422
        });
    }
    console.log("b===========sendMessage=");
    try {
        const { to, _msg, msgType } = req.body;
        console.log("c============sendMessage===");
        let wallet = new ethers.Wallet(privatekey, provider);
        let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
        const send = await instance.sendMessage(to, _msg, msgType)

        return res.status(200).json({
            status: 200,
            success: true,
            message: "message send successfully ",
        });



    } catch (error) {
        return res.status(500).json({
            error: error.message,
            status: 500
        });
    }

};

exports.readMessage = async (req, res) => {
    const errors = validationResult(req)
    console.log("a==============readMessage=");
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            status: 422
        });
    }
    console.log("b===========readMessage=");
    try {
        const { to } = req.body;
        console.log("c============readMessage===", to);
        let wallet = new ethers.Wallet(privatekey, provider);
        let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
        const read = await instance.readMessage(to)
        console.log("read", read);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "read ",
        });



    } catch (error) {
        return res.status(500).json({
            error: error.message,
            status: 500
        });
    }

};
// update rsa_key

exports.updateRSAkey = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            status: 422
        });
    }
    try {
        const { newRSAkey } = req.body;
        let wallet = new ethers.Wallet(privatekey, provider);
        let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
        const newRsaUpdate = await instance.updateRSAkey(newRSAkey)
        console.log("new rsa",newRsaUpdate);
        console.log("newRsaKey==", newRSAkey);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "rsa_key updated",
        });



    } catch (error) {
        return res.status(500).json({
            error: error.message,
            status: 500
        });
    }

};


//view Rsa Key 

// exports.viewRSAKey = async (req, res) => {
//     const errors = validationResult(req)
//     console.log("viewRSa hit");
//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             error: errors.array()[0].msg,
//             status: 422
//         });
//     }
//     try {
//         const { RSA_Key } = req.body;
//         let wallet = new ethers.Wallet(privatekey, provider);
//         let instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
//         const viewUserRsa_key = await instance.viewRSAKey(RSA_Key)
//         console.log("viewUserRsa_key rsa",viewUserRsa_key);
//         console.log("view==", RSA_Key);

//         return res.status(200).json({
//             status: 200,
//             success: true,
//             message: "rsa_key updated",
//         });



//     } catch (error) {
//         return res.status(500).json({
//             error: error.message,
//             status: 500
//         });
//     }

// };
