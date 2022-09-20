//const | Router | = require("express")
const express = require("express")
const workerModel = require("../models/workerModel1")
const router = express.Router()


router.get("/woker-frm", (req, res) => {
    res.render("worker_form")
})

//post route
router.post("/newWorker", async (req, res) => {
    try {
        const newWorker = new workerModel(req.body)
        await newWorker.save()
            .then(item => {
                res.send("item saved to database");
            })
        res.redirect("/woker-frm")
        console.log(req.body)
    }
    catch (err) {
        res.status(400).render("worker_form")
        //render -- pointing to a file
        //redirect -- to a path
    }
})

// router.get("/worker-list", (req, res) => {
//     res.render("workersList")
// })

//fetch route
router.get("/purch_list", async (req, res) => {
    try {
        let items = await workerModel.find();
        res.render("workersList", { workers: items })
    }
    catch (err) {
        console.log(err)
        res.send("Could not retrieve workers")
    }
})

//delete route
router.post("/purch_list", async (reg, res)=>{
    try{
        await workerModel.deleteOne({_id: reg.body._id})
    
    res.redirect("/purch_list")
    }
    catch(err){
    res.status(400).send("Unable to delete item from the db")
}
})


module.exports = router  //this should always be last
