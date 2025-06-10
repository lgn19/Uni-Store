import Router from "@koa/router";
import {
  getProducts,
  getUserOpenid,
  userLogin,
  getUser,
  getProductById,
  addGood,
  deleteGood,
  addPay,
  getPay,
} from "../controller/index.js";

const router = new Router({
  prefix: "/api",
});

router.get("/product", getProducts);
router.get("/product/id", getProductById);

router.get("/user/openid", getUserOpenid);
router.get("/user/login", userLogin);
router.get("/user", getUser);

router.post("/good", addGood);
router.delete("/good", deleteGood);

router.post("/pay", addPay);
router.get("/pay", getPay);

export default router;
