import { Router } from "express";
const routes = Router();
import { verify } from "jsonwebtoken";
import { create, login, remove, update } from "./controllers/UserController.js";
import { index } from "./mail.js";

function verifyJWT(req, res, next) {
  var token = req.headers["token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  verify(token, process.env.JWTSECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

routes.post("/user/register", create);
routes.post("/user/login", login);
routes.put("/user/update", update);
routes.delete("/user/delete", remove);
routes.get("/email", verifyJWT, index);
export default routes;
