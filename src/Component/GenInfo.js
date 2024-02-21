
import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from 'react';
import { FaRegEye ,FaEyeSlash } from "react-icons/fa";
import { useToast } from '@chakra-ui/react'

const GenInfo = ({setName, setEmail, setPassword, handleClick}) => {
  return (
    <div>
        <FormControl id = "first-name" isRequired>
        <FormLabel >Name</FormLabel>
        <Input placeholder='Enter your Full Name' onChange={(e) => setName(e.target.value)}/>

      </FormControl>

      <FormControl id = "email" isRequired>
        <FormLabel >Email</FormLabel>
         <Input placeholder='Enter your Email' 
         onChange={(e) => setEmail(e.target.value)}/>

      </FormControl>

      <FormControl id = "PhoneNumber" isRequired>
        <FormLabel >Phone Number</FormLabel>
         <Input placeholder='Enter your Phone Number' 
         onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>
       
      {/* <FormControl id = "password" isRequired>
        <FormLabel >Password</FormLabel>
         <InputGroup>
         <Input  type={show?'text' : 'password'} 
           placeholder='Enter your Password'
           value={password}
           onChange={(e) => setPassword(e.target.value)}/>
         <InputRightElement marginLeft= '2px'>
         <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <FaRegEye /> :<FaEyeSlash />  }
            </Button>
         </InputRightElement>
         </InputGroup>

      </FormControl> */}

      {/* <FormControl id = "Confirm password" isRequired>
        <FormLabel >Confirm Password</FormLabel>
         <InputGroup>
         <Input  type={show?'text' : 'password'} 
           placeholder='Enter your Password' onChange={(e) => setConfirmpassword(e.target.value)}/>
        
         </InputGroup>

      </FormControl> */}
    </div>
  )
}

export default GenInfo