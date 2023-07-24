import axios from 'axios';
const API_URL = 'https://fakestoreapi.com/products';

// Function to fetch data from the API
const fetchDataFromApi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Testing suite for API testing
describe('API Testing', () => {
  it('should fetch data from the API', async () => {
    try {
      const data = await fetchDataFromApi();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
    } catch (error) {
      // Using Jest's built-in expect function to handle assertions
      // The following line will fail the test and display the error message
      expect(error).toBeUndefined();
    }
  });

  // we can Add more test cases as needed
});
