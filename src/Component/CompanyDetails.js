import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Checkbox, Button, Select } from '@chakra-ui/react';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    taxpayerId: '',
    legalEntityName: '',
    legalEntityCity: '',
    legalAddress: '',
    zipCode: '',
    website: '',
    contractCurrency: 'EUR',
    addressMatch: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted', formData);
    // You would typically handle the submission logic here, like sending the data to a server
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="taxpayerId" isRequired>
        <FormLabel>Taxpayer ID*</FormLabel>
        <Input name="taxpayerId" value={formData.taxpayerId} onChange={handleChange} />
      </FormControl>

      <FormControl id="legalEntityName" isRequired>
        <FormLabel>Legal entity name*</FormLabel>
        <Input name="legalEntityName" value={formData.legalEntityName} onChange={handleChange} />
      </FormControl>

      <FormControl id="legalEntityCity" isRequired>
        <FormLabel>Legal entity city*</FormLabel>
        <Input name="legalEntityCity" value={formData.legalEntityCity} onChange={handleChange} />
      </FormControl>

      <FormControl id="legalAddress" isRequired>
        <FormLabel>Legal address*</FormLabel>
        <Input name="legalAddress" value={formData.legalAddress} onChange={handleChange} />
        <Input name="zipCode" placeholder="ZIP/Postal code" value={formData.zipCode} onChange={handleChange} />
      </FormControl>

      <FormControl id="website" isRequired>
        <FormLabel>Website*</FormLabel>
        <Input name="website" value={formData.website} onChange={handleChange} />
      </FormControl>

      <FormControl id="addressMatch" isRequired>
        <Checkbox name="addressMatch" isChecked={formData.addressMatch} onChange={handleChange}>
          The actual address matches the legal address
        </Checkbox>
      </FormControl>

      

      <Button type="submit" colorScheme="blue" isFullWidth mt="4">
        Register
      </Button>
    </form>
  );
};

export default CompanyDetails;
