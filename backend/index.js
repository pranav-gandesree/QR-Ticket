const cors = require("cors")
const express = require("express")
// add a stripe key
const stripe = require("stripe")("sk_test_51PD1lpSF5YdTTtWx3ZY8OaAzOIkV4klg9YNYfNkK9PhzBmuBe6adsFcOUyDHZPlU0QX9t6lWECRPEmn7B92UhLGc0043mJLPa9");

// const uuid = require("uuid/v4");

const app = express();

//middlewwares

app.use(express.json());
app.use(cors());


//routes

app.get("/", (req, res) => {
    res.send("hello thereee !!!!!")
})

app.post("/payment", async(req,res)=>{
    const {product, token} = req.body;
    console.log("product", product);
    console.log("price", product.price);

    //add idempontecykey with uuid

    // return stripe.customers.create({
    //     email: token.email,
    //     source: token.id
    // }).then(customer =>{
    //     stripe.charges.create({
    //         amount: product.price *100,
    //         currency: 'usd',
    //         customer: customer.id,
    //         description: product.name
    //     } )
    // })
    // .then(result => res.status(200).json(result))
    // .catch(err =>console.log(err))\

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{ product.price}}',
            quantity: 1,
          },
        ],
        mode: 'payment',

    });

        res.redirect(303, session.url);

})



//listen

app.listen(1111, () => {
    console.log('Server is running on port 1111');
});