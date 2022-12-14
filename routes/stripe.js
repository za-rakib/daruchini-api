const router = require("express").Router();
const stripe = require("stripe")(process.env.STIPE_KEY);

router.post("/payment", (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).send({ error: stripeErr });
        } else {
          res.status(200).send({ success: stripeRes });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
