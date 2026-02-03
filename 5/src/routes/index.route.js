const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log("this is middleware is between router and api")
});
router.get("/",(req,res)=>{
    res.json({
        message : "Hello everyone from my side"
    })
})
