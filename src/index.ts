import express, { Application } from "express";
const path = require("path");
const app: Application = express();
const port = 3000;
let loca: string = path.join(__dirname, "..", "public", "index.html");
app.use(
  express.static("public", {
    extensions: ["html", "css", "js"],
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.get("/", (req: any, res: any): void => {
  if (res.status) {
    res.status(200);
    res.sendFile(loca);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
