import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from 'react';
import { FaRegEye ,FaEyeSlash } from "react-icons/fa";
import { useToast } from '@chakra-ui/react'
import axios from  'axios'
// import { useHistory } from 'react-router-dom';
import  {Box } from '@chakra-ui/react';
import GenInfo from '../GenInfo';
import Coop from '../Coop';
import CompanyDetails from '../CompanyDetails';

const Signup = () => {
  const[name , setName] = useState('')
  const[email , setEmail] = useState('')
  const[ password, setPassword] = useState('')
  const [show  , setShow] = useState(false);
  const[confirmpassword , setConfirmpassword] = useState()
  const [loading , setLoading] = useState(false)
  const[pic , setPic] = useState();
  const toast = useToast();
  const arr = ['genralInformation' , 'co-operation' , 'companyDetails']

  const [companyDetails, setCompanyDetails]=useState({
  "generalInformation":{
    "firstName":"",
    "lastName":"",
    "position":"",
    "emailAddres" : "",
    "phoneNumber":"",
    "Company":"",
    "HeadquarterCity":"",
  },
  "cooperation" :{
   "typeOfCooperation": ""
  },
  "companyDetails":{
  
    "TaxpayerID" : "",
    "legalEntityName":"",
    "legalAddress":"",
  }})
  

  
const [section, setsection] = useState('genralInformation')  ;
  
  const handleClick =()=>{
    setShow(!show);
  }

  const postDetails = (pics)=>{
    setLoading(true);
    if(pics === undefined){
      toast({
        title: 'please select an image',
        position : 'bottom',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })

      return ;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pluro-app");
      data.append("cloud_name", "dmu2iihmh");
    
      
      const apiUrl = `https://api.cloudinary.com/v1_1/dmu2iihmh/image/upload?api_key=173524773573671&api_secret=6ELu5IovZokEabzI8zcxiCtHXCE`;
      fetch(apiUrl, {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
       
    }
    
  }

  const submitHandler = async()=>{
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){

      toast({
        title: 'please fill all the field',
        position : 'bottom',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return;
    }

    if(password !== confirmpassword){
      toast({
        title: 'please select an image',
        position : 'bottom',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }

    try{
      const config = {
       headers:{
        "content-type":"application/json",
       }
      };

      const {data} = await axios.post(
        "/api/user",
        {name,email,password,pic},
        config
      );

      toast({
        title: 'please select an image',
        position : 'bottom',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })

      localStorage.setItem("userInfo",JSON.stringify(data));

      setLoading(false)
      // history.push('/chats')

    }catch(error){

      toast({
        title: 'Error Occured',
        description:error.response.data.message,
        position : 'bottom',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
       
    }
  }

  console.log(name)
  useEffect(()=>{
    console.log(section);
  },[section])


  
  return (
    <VStack spacing="5px">
  <div class="flex justify-between w-full">
  <button class="text-black flex-grow bg-blue-100 p-2 rounded-xl" onClick={(e)=> setsection(e.target.value)} value={arr[0]}>General Information</button>
  <button class="text-black flex-grow mx-2 bg-blue-100 p-2 rounded-xl" onClick={(e)=> setsection(e.target.value)} value={arr[1]}>Type of Co-operation</button>
  <button class="text-black flex-grow bg-blue-100 p-2 rounded-xl" onClick={(e)=> setsection(e.target.value)} value={arr[2]}>Company Details</button>
</div>

{section === "co-operation" ? (
  <Coop companyDetails={companyDetails} setCompanyDetails={setCompanyDetails} />
) : section === "genralInformation" ? (
  <GenInfo />
) : section === "companyDetails" ? (
  <CompanyDetails />
) : null}





    
    <Box>
    
    </Box>
 
    <Button 
  colorScheme='blue'
  width="100%"
  style={{ marginTop: 15 }}
  onClick={submitHandler}
  isLoading={loading}
>
  {section === "genralInformation" || section === "co-operation" ? "Next" : "Sign Up"}
</Button>

      


    </VStack>
  )
}

export default Signup