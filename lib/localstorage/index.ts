export interface IStoreData {
  [key: string]: {
    visits: number;
    timestamp: Date;
    cat: string[];
  };
}
interface InputDataValue {
  visits?: number;
  cat?: string[];
}

interface InputData {
  [key: string]: InputDataValue;
}

const MAX_QUEUE_HEIGHT = 10;
// Function to sort the storage object by timestamp
function sortStorageByTimestamp(storage: IStoreData) {
  // Convert the object to an array of [key, value] pairs
  const entries = Object.entries(storage);

  // Sort the array based on the timestamp
  entries.sort((a: any, b: any) => a[1].timestamp - b[1].timestamp);

  // Convert the sorted array back to an object
  const sortedStorage = Object.fromEntries(entries);

  return sortedStorage;
}

export function addOrUpdateStore(storeName: string, categories: string[]) {
  const data = localStorage.getItem("storeData");
  let storeData = data ? JSON.parse(data) : {};

  // Unix timestamp
  const now = Math.floor(Date.now() / 1000);

  // When i get to a page, i check for the localstorage
  if (storeName in storeData) {
    // Increase the count
    storeData[storeName].visits += 1;
    // Update the timestamp
    storeData[storeName].timestamp = now;
    storeData[storeName].cat = categories;
  } else {
    // Add new
    storeData[storeName] = {
      visits: 1,
      cat: categories,
      timestamp: now,
    };

    // Run the LRU algorithm
    // The least recently used algorithm here will be based on the timestamp of the entry and then by the number of times the page was visited

    // First check that the length of the object is not more than 20
    const queueHeight = Object.keys(storeData).length;
    // The extra can only be 1, because the algorithm is run after adding a new entry
    if (queueHeight > MAX_QUEUE_HEIGHT) {
      // Timestamp takes precendece
      // Order by timestamp
      const sortedStorage = sortStorageByTimestamp(storeData);

      // Now that we have sorted by timestamp, we then examine the lower half of the object and eliminate by the number of page visits
      const entries = Object.entries(sortedStorage);

      // Split the entries into the first 10 and the rest
      const firstTenEntries = entries.slice(0, 10);
      const restEntries: any = entries.slice(10);

      // Sort the second half by the number of visits
      restEntries.sort(
        (a: { visits: number }[], b: { visits: number }[]) =>
          a[1].visits - b[1].visits
      );

      // Remove the entry with the least visits from the sorted second half
      restEntries.shift(); // Remove the first element, which has the least visits

      // Sore by timestamp
      const sortedEntries: any = sortStorageByTimestamp(restEntries);

      // Combine the two parts back into a single object
      const combinedEntries = firstTenEntries.concat(sortedEntries);

      // Save to storeData
      storeData = Object.fromEntries(combinedEntries);
    }
  }

  localStorage.setItem("storeData", JSON.stringify(storeData));
}

export function transformData(
  inputData: InputData
): Array<{ username: string; visits?: number; categories?: string[] }> {
  // Check if inputData is empty
  if (Object.keys(inputData).length === 0) {
    return []; // Return an empty array if inputData is empty
  }

  return Object.entries(inputData).map(([username, userData]) => ({
    username,
    visits: userData.visits,
    categories: userData.cat,
  }));
}
