// app.js
import { writeToIndexedDB } from './dist/bundle';

const data = { id: 1, value: 'Hello, IndexedDB!' };

writeToIndexedDB(data)
    .then(() => {
        console.log('Data successfully written to IndexedDB.');
    })
    .catch((error) => {
        console.error('Error writing to IndexedDB:', error.message);
    });
