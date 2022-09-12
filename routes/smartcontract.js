var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");


const {
    register,
    findUser,
    sendMessage,
    readMessage,
    updateRSAkey,
    viewRSAKey
} = require("../controller/SmartContract");

router.post(
    "/register",
    [
        // check("userName", "userName is required").isLength({min:3}),
        check("userName", "userName is required"),

        check("_RSA_Public_Key", "_RSA_Public_Key should be at least 8 char")
    ],
    register
);

router.post("/findUser",
    [check("userName", "userName is required")],
    findUser
);



router.post("/sendMessage",
    [check("to", "adress is required")],
    [check("_msg", "msg is required")],
    [check("msgType", "msg is required")]


    , sendMessage
);




router.get("/readMessage",
    [check("to", "address is required")], readMessage
);


//update Rsa_key


router.put("/updateRSAkey",
    [check("newRSAkey", "newRSAkey ")],updateRSAkey
);


//view Rsa_key

// router.get("/viewRSAKey",
//     [check("RSA_Key", "this is compulsory n")],viewRSAKey
// );

module.exports = router;
