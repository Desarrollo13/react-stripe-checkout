/* backende */
const express= require('express')
const Stripe = require('stripe')
const cors= require('cors') /* va servir para comunicar los dos servidores fronend y backend */

const app = express()

const stripe = new Stripe("sk_test_51HSpraJC6NEwMC09Dx0UicuHHPGSt7GYtz66RbomxfRDCys7VJu86YgTo2QTZnAkJ6Lk1ezVyqcJvQrnFKt3A2jz00SARhQFji")


app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout',async (req,res)=>{

   try{
    const { id, amount } = req.body

    const payment= await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Gaming Keyboord",
        payment_method:id,
        confirm: true
    });
    console.log(payment);

    res.send({message:'Succesfull payment'})

   }catch(error){
       console.log(error)
       res.json({message:error.raw.message})

   }
})


 app.listen(3001,()=>{
     console.log('server on port', 3001)
 })