import React, { useState,useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Container,
  Progress,
  useColorMode,
  HStack,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';

const MultiStepForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sub_category: '',
    highlights: [], // Ensure it's initialized as an array
    location: {
      address: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
      coordinates: {
        latitude: '',
        longitude: '',
      },
    },
    duration: '',
    start_time: [],
    end_time: [],
    schedule_type: '',
    currency: '',
    pricing_options: [],
    booking_url: '',
    booking_contact: '',
    images: [],
    videos: [],
    tags: [],
    accessibility: '',
    language: '',
    cancellation_policy: '',
    provider: '',
    website: '',
    hotels: [],
    average_rating: '',
    num_reviews: '',
    review_sources: [],
    promotions: [],
    packages: [],
    created_at: '',
    updated_at: '',
  });



  const [stage, setStage] = useState(1);
  const [highlights, setHighlights] = useState([]);


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      const newFormData = { ...formData, highlights: [...formData.highlights, searchTerm.trim()] };
      setFormData(newFormData);
      setSearchTerm('');
    }
  };

  const handleRemove = (indexToRemove) => {
    const newHighlights = formData.highlights.filter((_, index) => index !== indexToRemove);
    const newFormData = { ...formData, highlights: newHighlights };
    setFormData(newFormData);
  };

  ///////////////////////////////////////////////////////////////////

  

  const { colorMode, toggleColorMode } = useColorMode();

  const handlechang = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };


//................................................................................

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };
  //...............................................................................this is handle submit




  const handleNext = () => {
    setStage((prevStage) => prevStage < 5 ? prevStage + 1 : prevStage);
  };
  
  const handlePrev = () => {
    setStage((prevStage) => prevStage > 1 ? prevStage - 1 : prevStage);
  };
  
  useEffect(() => {
    console.log(formData.highlights);
  }, [formData.highlights]);

  return (
    <Container maxW="lg" mt={8} p={6} boxShadow="base" borderRadius="md">
      <Progress
  value={stage * 25}
  height="8px"
  borderRadius="md"
  bg="gray.200"
  mb={4}
>
</Progress>


      <form onSubmit={handleSubmit}>
        {stage === 1 && (
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Input type="text" name="category" value={formData.category} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Sub Category</FormLabel>
              <Input type="text" name="sub_category" value={formData.sub_category} onChange={handleChange} />
            </FormControl>
            <div>
            <FormControl>
        <FormLabel>Highlights</FormLabel>
        <Input
          type="text"
          name="highlights"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add"
        />
      </FormControl>
      <Box mt={4}>
        {formData.highlights.map((highlight, index) => (
          <Tag key={index} m={1} size="md" variant="solid" colorScheme="blue">
            <TagLabel>{highlight}</TagLabel>
            <TagCloseButton onClick={() => handleRemove(index)} />
          </Tag>
        ))}
      </Box>
    </div>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" value={formData.location.address} onChange={handleLocationChange} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Region</FormLabel>
              <Input type="text" name="region" value={formData.location.region} onChange={handleLocationChange} />
            </FormControl>
            <Button onClick={handleNext}>Next</Button>
          </VStack>
        )}
        {stage === 2 && (
          <VStack spacing={4} align="stretch">
           
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input type="text" name="postal_code" value={formData.location.postal_code} onChange={handleLocationChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input type="text" name="country" value={formData.location.country} onChange={handleLocationChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Latitude</FormLabel>
              <Input type="text" name="latitude" value={formData.location.coordinates.latitude} onChange={(e) => handleLocationChange({ target: { name: 'latitude', value: e.target.value } })} />
            </FormControl>
            <FormControl>
              <FormLabel>Longitude</FormLabel>
              <Input type="text" name="longitude" value={formData.location.coordinates.longitude} onChange={(e) => handleLocationChange({ target: { name: 'longitude', value: e.target.value } })} />
            </FormControl>
            <FormControl>
              <FormLabel>Duration</FormLabel>
              <Input type="number" name="duration" value={formData.duration} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input type="text" name="start_time" value={formData.start_time} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type="text" name="end_time" value={formData.end_time} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Schedule Type</FormLabel>
              <Input type="text" name="schedule_type" value={formData.schedule_type} onChange={handleChange} />
            </FormControl>
            <Button onClick={handlePrev}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </VStack>
        )}
         {stage === 3 && (
          <VStack spacing={4} align="stretch">
           
            <FormControl isRequired>
              <FormLabel>Currency</FormLabel>
              <Input type="text" name="currency" value={formData.currency} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Booking URL</FormLabel>
              <Input type="text" name="booking_url" value={formData.booking_url} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Booking Contact</FormLabel>
              <Input type="text" name="booking_contact" value={formData.booking_contact} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Images</FormLabel>
              <Input type="text" name="images" value={formData.images} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Videos</FormLabel>
              <Input type="text" name="videos" value={formData.videos} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input type="text" name="tags" value={formData.tags} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Accessibility</FormLabel>
              <Input type="text" name="accessibility" value={formData.accessibility} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Input type="text" name="language" value={formData.language} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Cancellation Policy</FormLabel>
              <Input type="text" name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Provider</FormLabel>
              <Input type="text" name="provider" value={formData.provider} onChange={handleChange} />
            </FormControl>
            {/* Pricing Options */}
            <Button onClick={handlePrev}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </VStack>
        )}
       {stage === 4 && (
          <VStack spacing={4} align="stretch">
           
           <FormControl>
      <FormLabel>Hotels</FormLabel>
      <Input type="text" name="hotels" value={formData.hotels} onChange={handleChange} />
    </FormControl>
    <FormControl>
      <FormLabel>Average Rating</FormLabel>
      <Input type="number" name="average_rating" value={formData.average_rating} onChange={handleChange} />
    </FormControl>
    <FormControl>
      <FormLabel>Number of Reviews</FormLabel>
      <Input type="number" name="num_reviews" value={formData.num_reviews} onChange={handleChange} />
    </FormControl>
    <FormControl>
      <FormLabel>Review Sources</FormLabel>
      <Input type="text" name="review_sources" value={formData.review_sources} onChange={handleChange} />
    </FormControl>
    <FormControl>
      <FormLabel>Promotions</FormLabel>
      <Input type="text" name="promotions" value={formData.promotions} onChange={handleChange} />
    </FormControl>
    <FormControl>
      <FormLabel>Packages</FormLabel>
      <Input type="text" name="packages" value={formData.packages} onChange={handleChange} />
    </FormControl>
    <Button onClick={handlePrev}>Previous</Button>
    <Button type="submit">Submit</Button>
          </VStack>
        )}
      </form>
      <Button onClick={toggleColorMode} mt={4}>
         {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Container>
  );
};

export default MultiStepForm;
