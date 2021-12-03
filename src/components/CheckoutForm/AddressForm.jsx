import React,{ useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { Link } from 'react-router-dom'
import { commerce } from "../../lib/commerce"

export const AddressForm = ({checkoutToken,next}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState(''); 
    // const methods = useForm();

    const Countries = Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}));
    const Subdivisions = Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}));
    const Options = shippingOptions && shippingOptions.map((so)=>({id: so.id,label:`${so.description} - (${so.price.formatted_with_symbol}) `}))

    console.log()

    const fetchShippingCountries = async(checkoutToken) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutToken);
        console.log("shippingCountries:")
        console.log(countries)
        
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async(countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        console.log(subdivisions)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async(checkoutTokenId,country, region = null) => {
        console.log("country:" + country) 
        console.log("region:" + region) 
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{ country, region });
        console.log("options:" + options) 
        setShippingOptions(options)
        if(options[0]) setShippingOption(options[0].id)
    }

    useEffect(()=>{
       fetchShippingCountries(checkoutToken.id);
    },[]);

    useEffect(()=>{
        if(shippingCountry)fetchSubdivisions(shippingCountry);
    },[shippingCountry]);
    
    useEffect(()=>{
        console.log("shippingCountry:" + shippingCountry)
        if(shippingSubdivision)fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
    },[shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry, shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='add1' label='Address'/>
                        <FormInput required name='email' label='Email'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='zip' label='ZIP / Postal Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                { Countries.map((country)=>(
                                        <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Province</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                { Subdivisions.map((subdivision)=>(
                                        <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        { Options.length > 0 ? 
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                                    { Options.map((option)=>(
                                                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            : <Grid item xs={12} sm={12}>
                                <Typography variant="body2" gutterBottom >We do not deliver to your selected province yet. Please select a different province. </Typography>                                
                            </Grid>
                        }
                    </Grid>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between '}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                        { Options.length > 0 ? <Button type="submit" variant="contained" color="primary" >Next</Button> 
                                            : <Button type="submit" variant="contained" color="primary" disabled>Next</Button>}
                        
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
