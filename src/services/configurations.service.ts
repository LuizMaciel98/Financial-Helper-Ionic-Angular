import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const FIRST_TIME_OPPENED : string = 'FIRST_TIME_OPENNED';

@Injectable()
export class ConfigurationService {

    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this._storage = storage;

        await this.appFirstTimeOpened();
    }

    public async appFirstTimeOpened() {
        const dateFirstTimeOpenned = await this._storage?.get(FIRST_TIME_OPPENED);

        if (dateFirstTimeOpenned == null || dateFirstTimeOpenned == undefined) {
            const now = new Date();
            this.set(FIRST_TIME_OPPENED, now);
        }
    }

    private set(key: string, value: any) {
        this._storage?.set(key, value);
    }
}