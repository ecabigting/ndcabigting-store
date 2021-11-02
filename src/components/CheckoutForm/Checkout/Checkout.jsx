import React , { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CicularProgress, Divider, Button } from '@material-ui/core'
import { AddressForm } from '../AddressForm';
import { PaymentForm } from '../PaymentForm';
import useStyles from './styles'

const steps = ['Shipping Address', 'Payment Details'];
const Confirmation = () => (<div>Confirmation</div>)

export const Checkout = () => {
    const [activeStep,setActiveStep] = useState(0);
    const styles = useStyles();

    const Form = () => activeStep === 0 ? <AddressForm/> : <PaymentForm/>
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
                    { activeStep === steps.length ? <Confirmation/> : <Form/> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout