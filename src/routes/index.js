const { Router } = require("express");
const router = Router()
const ctrHome = require("../controllers/home.controller")
const ctrImages = require("../controllers/images.controller")

router.get("/", ctrHome.index)
router.get("/images/:imageId", ctrImages.index)
router.post("/images", ctrImages.create)
router.post("/images/:imageId/like", ctrImages.like)
router.post("/images/:imageId/comment", ctrImages.comment)
router.delete("/images/:imageId", ctrImages.remove)

module.exports = router;