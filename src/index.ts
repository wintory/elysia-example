import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { UserController } from "./controllers/user-controller";
 
const app = new Elysia();
 
app.use(bearer()).onBeforeHandle(async ({ bearer }) => {
  if (!bearer) throw new Error("Unauthorized");
  const isAuthorized = bearer === "test12345";
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
});
app.use(UserController);
 
const PORT = process.env.PORT || 8080;
 
mongoose
  .connect("mongodb://localhost:27017/elysia")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

    
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
