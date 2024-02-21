import React, { useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';

const Coop = ({ companyDetails, setCompanyDetails }) => {
  // Function to handle clicking the first checkbox
  const handleFirstCheckbox = () => {
    setCompanyDetails(prevState => ({
      ...prevState,
      cooperation: {
        ...prevState.cooperation,
        typeOfCooperation: "Sales of Travel Services"
      }
    }));
  };

  // Function to handle clicking the second checkbox
  const handleSecondCheckbox = () => {
    setCompanyDetails(prevState => ({
      ...prevState,
      cooperation: {
        ...prevState.cooperation,
        typeOfCooperation: "Traffic Monetization"
      }
    }));
  };

  // useEffect hook to log typeOfCooperation when it changes
  useEffect(() => {
    console.log("Type of Cooperation:", companyDetails.cooperation.typeOfCooperation);
  }, [companyDetails.cooperation.typeOfCooperation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0 0 2px' }}>
      <div id='firstCheck'>
        <Checkbox
          onChange={handleFirstCheckbox}
          isChecked={companyDetails.cooperation.typeOfCooperation === "Sales of Travel Services"}
        >
       Sales of Travel Services
        </Checkbox>
      </div>
      <div id='secondCheck'>
        <Checkbox
          onChange={handleSecondCheckbox}
          isChecked={companyDetails.cooperation.typeOfCooperation === "Traffic Monetization"}
        >
          Traffic Monetization
        </Checkbox>
      </div>
    </div>
  );
};

export default Coop;
