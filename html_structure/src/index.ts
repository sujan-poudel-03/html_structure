// src/index.ts

export function addNumbers(a: number, b: number): number {
    return a + b;
}

export class HTMLParser {
    constructor(private html: string) {}

    getHTML(): string {
        return this.html;
    }

}


export function writeToLocalStorage(data: any): void {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem('myData', JSON.stringify(data));
    }
}

export function writeToIndexedDB(data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (typeof window !== 'undefined' && 'indexedDB' in window) {
            const request = window.indexedDB.open('MyDatabase', 1);

            request.onupgradeneeded = function (event: any) {
                const db = event.target.result as IDBDatabase;
                const objectStore = db.createObjectStore('MyObjectStore', { keyPath: 'id' });
            };

            request.onsuccess = function (event: any) {
                const db = event.target.result as IDBDatabase;
                const transaction = db.transaction('MyObjectStore', 'readwrite');
                const objectStore = transaction.objectStore('MyObjectStore');

                const addRequest = objectStore.add(data);

                addRequest.onsuccess = function () {
                    resolve();
                };

                addRequest.onerror = function (event: any) {
                    reject(new Error(event.target.error));
                };
            };

            request.onerror = function (event: any) {
                reject(new Error(event.target.error));
            };
        } else {
            reject(new Error('IndexedDB is not available in this environment.') as Error);
        }
    });
}
