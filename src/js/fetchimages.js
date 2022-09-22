import axios from 'axios';
// export async function fetchchImages(inputValue) {
//   const data = await axios.get(
//     `https://pixabay.com/api/?key=30078668-25ca7b274b0e0bd0b8e169162&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
//   );
//   const images = await data.data.hits;
//   console.log(images);
//   return images;
// }

export async function fetchchImages(inputValue, pageNumber) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=29822518-04e2ef9290d818246b595cdf4&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
