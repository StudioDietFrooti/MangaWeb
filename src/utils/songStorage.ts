import { SongItem } from '../types';

const DB_NAME = 'StreamGlassAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'user_songs';

interface StoredSongRecord {
  id: string;
  title: string;
  artist: string;
  duration: string;
  blob?: Blob;
  audioUrl?: string;
  coverUrl?: string;
  timestamp: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveUserSong(song: SongItem, file?: File): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: StoredSongRecord = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      blob: file,
      audioUrl: song.audioUrl.startsWith('blob:') ? undefined : song.audioUrl,
      coverUrl: song.coverUrl,
      timestamp: Date.now(),
    };

    store.put(record);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Failed to save song in IndexedDB', err);
  }
}

export async function loadUserSongs(): Promise<SongItem[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve) => {
      request.onsuccess = () => {
        const records = (request.result as StoredSongRecord[]) || [];
        const items: SongItem[] = records.map((rec) => {
          let audioUrl = rec.audioUrl || '';
          if (rec.blob) {
            audioUrl = URL.createObjectURL(rec.blob);
          }
          return {
            id: rec.id,
            title: rec.title,
            artist: rec.artist,
            duration: rec.duration,
            audioUrl,
            coverUrl: rec.coverUrl,
          };
        });
        resolve(items);
      };
      request.onerror = () => resolve([]);
    });
  } catch (err) {
    console.warn('Failed to load songs from IndexedDB', err);
    return [];
  }
}

export async function updateSongTitle(id: string, newTitle: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const record = getReq.result as StoredSongRecord | undefined;
      if (record) {
        record.title = newTitle;
        store.put(record);
      }
    };
  } catch (err) {
    console.warn('Failed to update song title', err);
  }
}

export async function deleteUserSong(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
  } catch (err) {
    console.warn('Failed to delete song', err);
  }
}
