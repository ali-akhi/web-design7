import React,{useState, useEffect} from 'react'
import {FormControl, Paper, Select, TextField} from "@material-ui/core";
import "../App.css";
import axios, * as others from 'axios';
const Main = () => {
    const [text1, settext1] = useState(1);
    const [text2, settext2] = useState(1);
    const [country, setcountry] = useState([]);
    const [country2, setcountry2] = useState([]);
    const [value1, setvalue1] = useState(1);
    const [value2, setvalue2] = useState(1);


    useEffect(() => {
        getdata();
    }, [])

    async function getdata(){
        const result =await axios.get("http://data.fixer.io/api/latest?access_key=a40280486ed6ce275ad7a4a044f05c7e");
        setcountry(result.data.rates);
        setcountry2(result.data.rates);
    }

    function convert(e){
        e.preventDefault();
        let num= (value2/value1) * text1;
        settext2(num);
    }
    return (
        <div>
            <Paper className= "paper">
                <h3>Currency Converter</h3>
                <form onSubmit= {convert}>
                    <div>
                        <TextField variant='outlined' value= {text1 || " "  || {  }} onChange= {(e)=> settext1(e.target.value)} autoComplete= "off"/>
                        <FormControl className= "dropdown" variant= 'outlined' onChange= {(e)=> setvalue1(e.target.value)}>
                            <Select native>
                                    {
                                        Object.keys(country).map((value, index)=>( <option key= {index} value= {country[value]}>{value}</option>))
                                    }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField variant='outlined' variant= 'outlined' value= {text2 || " " || {  }}/>
                        <FormControl className= "dropdown" onChange= {(e)=> setvalue2(e.target.value)}>
                            <Select native>
                                    {Object.keys(country2).map((value, index)=> (<option key= {index} value= {country[value]}>{value}</option>))}
                            </Select>
                        </FormControl>
                    </div>
                    <button type= "submit" className= "button" variant= "cotained">Convert</button>
                </form>
            </Paper>
        </div>
    )
}

export default Main
