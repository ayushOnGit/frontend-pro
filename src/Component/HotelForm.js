import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  VStack,
  HStack,
  Progress,
  Box,
  NumberInput,
  NumberInputField,
  Checkbox,
  CheckboxGroup,
  IconButton,
  useColorMode,
  Icon,
  Center,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
      neighborhood: '',
      district: '',
      state_province: '',
      coordinates: {
        latitude: '',
        longitude: '',
      },
    },
    review_sources: {
      tripadvisor: '',
      booking_com: '',
    },
    amenities: [],
    facilities: [],
    accessibility: {
      accessible_rooms: false,
      facilities: [],
      services: [],
    },
    sustainability: {
      certifications: [],
      initiatives: [],
    },
    unique_selling_points: [],
    guest_preferences: {
      quiet_room: false,
      early_check_in: false,
    },
    images: [],
    videos: [],
    virtual_tours: [],
    panoramic_images: [],
    cancellation_policy: '',
    check_in_time: '',
    check_out_time: '',
    currency: '',
    price_range: { min: '', max: '' },
    room_types: [
      {
        type: '',
        description: '',
        occupancy: 0,
        amenities: [],
        facilities: [],
        images: [],
        price: 0,
        availability: {
          start_date: '',
          end_date: '',
          available_rooms: '',
        },
        pet_friendly: false,
      },
    ],
      tags: [],
      awards: [],
      payment_methods: [],
      cultural_attractions: [],
      nearby_landmarks: [],
    
      meeting_rooms: {
        capacity: '',
        amenities: [],
        facilities: [],
      },
      banquet_halls: {
        capacity: '',
        amenities: [],
        facilities: [],
      },
  });
  

  const [currentStage, setCurrentStage] = useState(1);
  const { colorMode, toggleColorMode } = useColorMode();


  const handleRoomTypeChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.map((roomType, i) =>
        i === index ? { ...roomType, [field]: value } : roomType
      ),
    }));
  };
  
  const handleRoomTypeNumberChange = (value, field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.map((roomType, i) =>
        i === index ? { ...roomType, [field]: value } : roomType
      ),
    }));
  };
  
  const handleRoomTypeArrayChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.map((roomType, i) =>
        i === index ? { ...roomType, [field]: value.split(',').map(item => item.trim()) } : roomType
      ),
    }));
  };
  
  const handleRoomTypeDateChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.map((roomType, i) =>
        i === index ? { ...roomType, availability: { ...roomType.availability, [field]: value } } : roomType
      ),
    }));
  };
  
  const handleRoomTypeBooleanChange = (e, field, index) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.map((roomType, i) =>
        i === index ? { ...roomType, [field]: checked } : roomType
      ),
    }));
  };
  
  const handleAddRoomType = () => {
    setFormData((prevData) => ({
      ...prevData,
      room_types: [...prevData.room_types, {
        type: '',
        description: '',
        occupancy: '',
        amenities: [],
        facilities: [],
        images: [],
        price: '',
        availability: {
          start_date: '',
          end_date: '',
          available_rooms: '',
        },
        pet_friendly: false,
      }],
    }));
  };
  
  const handleRemoveRoomType = (indexToRemove) => {
    if (formData.room_types.length === 1) {
      // If there is only one room type, do not allow removal
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      room_types: prevData.room_types.filter((room, index) => index !== indexToRemove),
    }));
  };
  




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split('.');
    
    if (['tags', 'awards', 'payment_methods', 'cultural_attractions', 'nearby_landmarks'].includes(name)) {
      // Handle array fields by splitting comma-separated values
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else if (nameParts[0] === 'meeting_rooms' || nameParts[0] === 'banquet_halls') {
      // Handle changes in the nested fields of meeting_rooms and banquet_halls
      const parentField = nameParts[0];
      const childField = nameParts[1];
      setFormData((prevData) => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [childField]: childField === 'amenities' || childField === 'facilities' ? value.split(',').map(item => item.trim()) : (type === 'number' ? parseInt(value, 10) : value),
        },
      }));
    } else if (nameParts.length === 2) {
      // Handle other nested objects
      const parentField = nameParts[0];
      const childField = nameParts[1];
      setFormData((prevData) => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [childField]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };


  const handleNestedChange = (parentField, childField, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [childField]: parseInt(value, 10) || 0, // Ensure conversion to integer, default to 0 if NaN
      },
    }));
  };
  
  
  
  const handleArrayChange = (e, parentField, childField) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [childField]: value.split(',').map(item => item.trim()),
      },
    }));
  };
  
  
  
  
  
  const handleNumberChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    }
  };

  const handleNestedCheckboxChange = (value, parentField, childField) => {
    setFormData((prevData) => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [childField]: value,
      },
    }));
  };

  const handleNestedCheckboxGroupChange = (values, parentField, childField) => {
    setFormData((prevData) => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [childField]: values,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleNext = () => {
    setCurrentStage((prevStage) => (prevStage < 5 ? prevStage + 1 : prevStage));
  };
  

  const handlePrev = () => {
    setCurrentStage((prevStage) => (prevStage > 1 ? prevStage - 1 : prevStage));
  };

  return (
    <Box bg="#f3e8ff" minHeight="100vh" > 
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="50%" bg="white"borderRadius="3xl" boxShadow="md" p={6}>
      <Progress value={(currentStage / 5) * 100} size="sm" colorScheme="purple" mb={4} mt={4} />

      <IconButton
        icon={colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
        isRound={true}
        size="md"
        alignSelf="flex-end"
        position="absolute"
        top={4}
        right={4}
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
      />

        <form onSubmit={handleSubmit}>
          {currentStage === 1 && (
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
              </FormControl>
              <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
                <FormLabel><strong>Address</strong></FormLabel>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel>Street</FormLabel>
                    <Input name="address.street" value={formData.address.street} onChange={handleChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input name="address.city" value={formData.address.city} onChange={handleChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Region</FormLabel>
                    <Input name="address.region" value={formData.address.region} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Postal Code</FormLabel>
                    <Input name="address.postal_code" value={formData.address.postal_code} onChange={handleChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input name="address.country" value={formData.address.country} onChange={handleChange} required />
                  </FormControl>
                  {/* Include other address fields as needed */}
                </Stack>
              </Box>
            </Stack>
          )}

{currentStage === 2 && (
    <Stack spacing={4}>
      {/* Existing Stage 2 fields... */}

      <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
        <FormLabel><strong>Review Sources</strong></FormLabel>
        <FormControl>
          <FormLabel>TripAdvisor ID</FormLabel>
          <Input name="review_sources.tripadvisor" value={formData.review_sources.tripadvisor} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Booking.com ID</FormLabel>
          <Input name="review_sources.booking_com" value={formData.review_sources.booking_com} onChange={handleChange} />
        </FormControl>
      </Box>

      {/* Amenities and Facilities as CheckboxGroups or Inputs based on your UI design */}

      <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
        <FormLabel><strong>Accessibility</strong></FormLabel>
        <Checkbox isChecked={formData.accessibility.accessible_rooms} onChange={(e) => handleNestedCheckboxChange(e.target.checked, 'accessibility', 'accessible_rooms')}>
          Accessible Rooms Available
        </Checkbox>
        {/* Accessibility Facilities and Services as needed */}
      </Box>

      <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
                <FormLabel><strong>Sustainability</strong></FormLabel>
                <CheckboxGroup name="sustainability.certifications" onChange={(values) => handleNestedCheckboxGroupChange(values, 'sustainability', 'certifications')}>
                  {/* Dynamically generate these or list statically if they are fixed */}
                  <Checkbox value="LEED">LEED Certification</Checkbox>
                  <Checkbox value="GreenKey">Green Key Certification</Checkbox>
                  {/* Add more certifications as needed */}
                </CheckboxGroup>
                <CheckboxGroup name="sustainability.initiatives" onChange={(values) => handleNestedCheckboxGroupChange(values, 'sustainability', 'initiatives')}>
                  {/* Dynamically generate these or list statically if they are fixed */}
                  <Checkbox value="EnergySaving">Energy Saving Initiatives</Checkbox>
                  <Checkbox value="WaterConservation">Water Conservation Initiatives</Checkbox>
                  {/* Add more initiatives as needed */}
                </CheckboxGroup>
              </Box>

      {/* Other fields and controls */}
      <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
                <FormLabel><strong>Guest Preferences</strong></FormLabel>
                <Checkbox
                  name="guest_preferences.quiet_room"
                  isChecked={formData.guest_preferences.quiet_room}
                  onChange={handleCheckboxChange}
                >
                  Quiet Room
                </Checkbox>
                <Checkbox
                  name="guest_preferences.early_check_in"
                  isChecked={formData.guest_preferences.early_check_in}
                  onChange={handleCheckboxChange}
                >
                  Early Check-In
                </Checkbox>
              </Box>

              <FormControl>
                <FormLabel>Unique Selling Points</FormLabel>
                <Textarea
                  placeholder="Enter unique selling points, separated by commas"
                  name="unique_selling_points"
                  value={formData.unique_selling_points.join(', ')}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
      <FormLabel>Video URL</FormLabel>
      <Input
        type="text"
        name="videos"
        placeholder="Add a video URL"
        value={formData.videos[0] || ''} // Showing the first video URL as an example
        onChange={(e) => handleChange(e, 'videos')} // Customized handleChange to handle array updates
      />
    </FormControl>

    <FormControl>
      <FormLabel>Image URL</FormLabel>
      <Input
        type="text"
        name="images"
        placeholder="Add an image URL"
        value={formData.images[0] || ''} 
        onChange={(e) => handleChange(e, 'images')}  
      />
    </FormControl>

     
            <FormControl>
              <FormLabel>Virtual Tours</FormLabel>
              <Input
                type="text"
                name="virtual_tours"
                placeholder="Add virtual tour URLs, separated by commas"
                value={formData.virtual_tours.join(', ')}
                onChange={handleChange}
              />
            </FormControl>
            

    </Stack>
  )}

{currentStage === 3 && (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Check-in Time</FormLabel>
        <Input name="check_in_time" value={formData.check_in_time} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Check-out Time</FormLabel>
        <Input name="check_out_time" value={formData.check_out_time} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Currency</FormLabel>
        <Input name="currency" value={formData.currency} onChange={handleChange} required />
      </FormControl>
      <FormControl>
        <FormLabel>Price Range (Min)</FormLabel>
        <NumberInput value={formData.price_range.min} onChange={(value) => handleNumberChange(value, 'price_range.min')}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Price Range (Max)</FormLabel>
        <NumberInput value={formData.price_range.max} onChange={(value) => handleNumberChange(value, 'price_range.max')}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      {formData.room_types.map((roomType, index) => (
  <Box key={index} border="1px" borderColor="gray.200" p={4} borderRadius="md" position="relative">
    {index !== 0 && ( // Display cross icon for all room types except the first one
      <IconButton
        icon={<CloseIcon />}
        aria-label="Remove room type"
        variant="ghost"
        colorScheme="red"
        size="sm"
        position="absolute"
        top="1rem"
        right="1rem"
        onClick={() => handleRemoveRoomType(index)}
      />
    )}
          <FormLabel>Room Type {index + 1}</FormLabel>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                value={roomType.type}
                onChange={(e) => handleRoomTypeChange(e, 'type', index)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={roomType.description}
                onChange={(e) => handleRoomTypeChange(e, 'description', index)}
                rows={5}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Occupancy</FormLabel>
              <NumberInput
                value={roomType.occupancy}
                onChange={(value) => handleRoomTypeNumberChange(value, 'occupancy', index)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Input
                value={roomType.amenities.join(', ')}
                onChange={(e) => handleRoomTypeArrayChange(e, 'amenities', index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Facilities</FormLabel>
              <Input
                value={roomType.facilities.join(', ')}
                onChange={(e) => handleRoomTypeArrayChange(e, 'facilities', index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Images</FormLabel>
              <Input
                value={roomType.images.join(', ')}
                onChange={(e) => handleRoomTypeArrayChange(e, 'images', index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <NumberInput
                value={roomType.price}
                onChange={(value) => handleRoomTypeNumberChange(value, 'price', index)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={roomType.availability.start_date}
                onChange={(e) => handleRoomTypeDateChange(e, 'start_date', index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={roomType.availability.end_date}
                onChange={(e) => handleRoomTypeDateChange(e, 'end_date', index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Available Rooms</FormLabel>
              <NumberInput
                value={roomType.availability.available_rooms}
                onChange={(value) => handleRoomTypeNumberChange(value, 'available_rooms', index)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Pet Friendly</FormLabel>
              <Checkbox
                isChecked={roomType.pet_friendly}
                onChange={(e) => handleRoomTypeBooleanChange(e, 'pet_friendly', index)}
              >
                Pet Friendly
              </Checkbox>
            </FormControl>
          </Stack>
        </Box>
      ))}

<Box mt={8} width="50%" mx="auto">
  <Center>
    <Button onClick={handleAddRoomType} colorScheme="purple" size="sm" mt={-10}>Add More</Button>
  </Center>
</Box>







    </Stack>
  )}

{currentStage === 4 && (
  <Stack spacing={4}>
    {/* Tags Input */}
    <FormControl>
      <FormLabel>Tags</FormLabel>
      {/* Example of handling multiple tags; adjust based on your UI requirements */}
      <Input
        type="text"
        placeholder="Enter tags"
        value={formData.tags.join(', ')} // Assuming tags are comma-separated
        onChange={(e) => handleChange(e, 'tags')}
      />
    </FormControl>

    {/* Awards Input */}
    <FormControl>
      <FormLabel>Awards</FormLabel>
      <Input
        type="text"
        placeholder="Enter awards"
        value={formData.awards.join(', ')} // Assuming awards are comma-separated
        onChange={(e) => handleChange(e, 'awards')}
      />
    </FormControl>

    {/* Payment Methods Input */}
    <FormControl>
      <FormLabel>Payment Methods</FormLabel>
      <Input
        type="text"
        placeholder="Enter payment methods"
        value={formData.payment_methods.join(', ')} // Assuming payment methods are comma-separated
        onChange={(e) => handleChange(e, 'payment_methods')}
      />
    </FormControl>

    {/* Historical Info Input */}
    <FormControl>
      <FormLabel>Historical Info</FormLabel>
      <Textarea
        placeholder="Enter historical info"
        value={formData.historical_info}
        onChange={(e) => handleChange(e, 'historical_info')}
      />
    </FormControl>

    {/* Cultural Attractions Input */}
    <FormControl>
      <FormLabel>Cultural Attractions</FormLabel>
      <Input
        type="text"
        placeholder="Enter cultural attractions"
        value={formData.cultural_attractions.join(', ')} // Assuming cultural attractions are comma-separated
        onChange={(e) => handleChange(e, 'cultural_attractions')}
      />
    </FormControl>

    {/* Nearby Landmarks Input */}
    <FormControl>
      <FormLabel>Nearby Landmarks</FormLabel>
      <Input
        type="text"
        placeholder="Enter nearby landmarks"
        value={formData.nearby_landmarks.join(', ')} // Assuming nearby landmarks are comma-separated
        onChange={(e) => handleChange(e, 'nearby_landmarks')}
      />
    </FormControl>
  </Stack>
)}

{currentStage === 5 && (
  <Stack spacing={4}>
    {/* Meeting Rooms Wrapper */}
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <FormLabel fontWeight="bold">Meeting Rooms</FormLabel>
      <FormControl>
  <FormLabel>Meeting Rooms Capacity</FormLabel>
  <NumberInput
  defaultValue={formData.meeting_rooms.capacity}
  min={0}
  onChange={(valueString) => handleNestedChange('meeting_rooms', 'capacity', parseInt(valueString, 10) || 0)}
>
  <NumberInputField name="meeting_rooms.capacity" />
</NumberInput>

</FormControl>

      <FormControl>
        <FormLabel>Amenities (comma-separated)</FormLabel>
        <Input
          name="meeting_rooms.amenities"
          value={formData.meeting_rooms.amenities.join(', ')}
          onChange={(e) => handleArrayChange(e, 'meeting_rooms', 'amenities')}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Facilities (comma-separated)</FormLabel>
        <Input
          name="meeting_rooms.facilities"
          value={formData.meeting_rooms.facilities.join(', ')}
          onChange={(e) => handleArrayChange(e, 'meeting_rooms', 'facilities')}
        />
      </FormControl>
    </Box>

    {/* Banquet Halls Wrapper */}
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <FormLabel fontWeight="bold">Banquet Halls</FormLabel>
      <FormControl>
        <FormLabel>Capacity</FormLabel>
        <NumberInput
  defaultValue={formData.banquet_halls.capacity}
  min={0}
  onChange={(valueString) => handleNestedChange('banquet_halls', 'capacity', parseInt(valueString, 10) || 0)}
>
  <NumberInputField name="banquet_halls.capacity" />
</NumberInput>

      </FormControl>
      <FormControl>
        <FormLabel>Amenities (comma-separated)</FormLabel>
        <Input
          name="banquet_halls.amenities"
          value={formData.banquet_halls.amenities.join(', ')}
          onChange={(e) => handleArrayChange(e, 'banquet_halls', 'amenities')}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Facilities (comma-separated)</FormLabel>
        <Input
          name="banquet_halls.facilities"
          value={formData.banquet_halls.facilities.join(', ')}
          onChange={(e) => handleArrayChange(e, 'banquet_halls', 'facilities')}
        />
      </FormControl>
    </Box>
   
  </Stack>
)}

  
<Box mt={8} width="100%" textAlign="center">
  <HStack spacing={4} justify="center">
    <Button onClick={handlePrev} disabled={currentStage === 1} colorScheme="purple">Back</Button>
    {currentStage < 5 && (
      <Button onClick={handleNext} colorScheme="purple">Next</Button>
    )}
    {currentStage === 5 && (
      <Button type="submit" colorScheme="purple">Submit</Button>
    )}
  </HStack>
</Box>



        </form>
      </Container>
    </Box>
    </Box>
  );
};

export default HotelForm;
