import express from "express";
import cors from "cors";
import axios from "axios";
import moment from "moment";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("API works , read more github docs");
});

app.post("/convert", async (req, res) => {
  let amountask = req.body.amount;

  axios
    .get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.min.json"
    )
    .then((result) => {
      console.log(result.data.inr);

      let rs = result.data.inr;

      let rsusd = amountask * rs;

      console.log(rsusd);

      return res.json({ message: rsusd, amount: amountask });
    });
});

app.get("/chart", async (req, res) => {
  var myDate = [];
  var myResult = [];

  for (let index = 0; index < 30; index++) {
    myDate.push(moment().subtract(index, "days").format("YYYY-MM-DD"));
  }

  for (var i = 0; i <= myDate.length - 1; i++) {
    await axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${myDate[i]}/currencies/usd/inr.min.json`
      )
      .then((response) => {
        let obj = response.data;
        myResult.push(obj);
      });
  }

  return res.json({ rates: myResult });
});

app.listen(8080);
