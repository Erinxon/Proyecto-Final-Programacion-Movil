import { Injectable } from '@angular/core';
import { Negocio } from '../models/negocio.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async get(key: string): Promise<Negocio[]>{
    const personas = await this.storage.get(key);
    return JSON.parse(personas);
  }

  async set(key: string, value: Negocio[]): Promise<void> {
    await this.storage.set(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }
}
