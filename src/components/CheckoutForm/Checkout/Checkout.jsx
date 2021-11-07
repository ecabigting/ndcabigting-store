import React , { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CicularProgress, Divider, Button } from '@material-ui/core'
import { AddressForm } from '../AddressForm';
import { PaymentForm } from '../PaymentForm';
import useStyles from './styles'

import { commerce } from '../../../lib/commerce'
const steps = ['Shipping Address', 'Payment Details'];
const Confirmation = () => (<div>Confirmation</div>)

export const Checkout = ({cart}) => {
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckoutToken] = useState(null);
    const styles = useStyles();

    useEffect(()=>{
        const generateCheckoutToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckoutToken(token);
            }catch(error){
                console.log('--error getting checkout token--')
                console.log(error)
            }
        }
        generateCheckoutToken();
    },[cart]);

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken}/> : <PaymentForm/>
    return (
        <>
            <div className={styles.toolbar}/>
            <main className={styles.layout}>
                <Paper className={styles.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper active={activeStep} className={styles.stepper}>
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