import React , { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CicularProgress, Divider, Button, CircularProgress, CssBaseline } from '@material-ui/core'
import { AddressForm } from '../AddressForm';
import { PaymentForm } from '../PaymentForm';
import useStyles from './styles'

import { commerce } from '../../../lib/commerce'
import { Link,useHistory } from 'react-router-dom';
const steps = ['Shipping Address', 'Payment Details'];

export const Checkout = ({cart,
                            order,
                            onCaptureCheckout,
                            error   }) => {
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const styles = useStyles();
    const history = useHistory();

    useEffect(()=>{
        const generateCheckoutToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckoutToken(token);
            }catch(error){
                history.pushState('/');
                console.log('--error getting checkout token--')
                console.log(error)
            }
        }
        generateCheckoutToken();
    },[cart]);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchse, {order.customer.firstname} {order.customer.lastname}
                </Typography>
                <Divider className={styles.divider}/>
                <Typography variant="subtitle2">Order Reference #: {order.customer_reference}</Typography>
                <br/>
                <Button component={Link} to ="/" variant="outlined" type="button">Continue shopping.</Button>
            </div>
        </>
    ) : (
        <div className={styles.spinner}>
            <CircularProgress/>
        </div>
    );
    
    if(error) {
        <>
            <Typography variant="h5">
                Error: {error}
                <br/>
                <Button component={Link} to ="/" variant="outlined" type="button">Continue shopping.</Button>
            </Typography>
        </>
    }

    const Form = () => activeStep === 0 ? 
    <AddressForm checkoutToken={checkoutToken} next={next}/> : 
    <PaymentForm shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} next={next} nextStep={nextStep} backStep={backStep}/>
    return (
        <>
        <CssBaseline/>
            <div className={styles.toolbar}/>
            <main className={styles.layout}>
                <Paper className={styles.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={styles.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout