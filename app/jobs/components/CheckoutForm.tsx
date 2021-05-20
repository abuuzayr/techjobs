import React, { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

export default function CheckoutForm(props) {
    const {
      setSucceeded,
      setError,
      setProcessing,
      setDisabled,
      submit
    } = props
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/createPaymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  useEffect(() => {
    if (submit) {
        handleSubmit()
    }
  }, [submit])

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async () => {
    setProcessing(true)

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) || { token: '' },
      },
    })

    if (payload?.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError("")
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
}
