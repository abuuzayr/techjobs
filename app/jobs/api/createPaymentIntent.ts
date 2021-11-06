const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const fn = async (req, res) => {
  if (req.method === "POST") {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: 4900,
      currency: "sgd",
    })

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      })
    )
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default fn;
