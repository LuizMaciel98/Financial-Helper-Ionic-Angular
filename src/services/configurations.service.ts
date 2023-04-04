import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const FIRST_TIME_OPPENED : string = 'FIRST_TIME_OPENNED';

@Injectable()
export class ConfigurationService {

    private _storage: Storage | null = null;
    
    private dateFirstTimeOpenned: any = '';

    constructor(private storage: Storage) {
        this.init();
    }


    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this._storage = storage;

        // await this.isAppFirstTimeOpened();
    }


    public async isAppFirstTimeOpened(): Promise<boolean> {

        if (this.dateFirstTimeOpenned == '') {
            this.dateFirstTimeOpenned = await this._storage?.get(FIRST_TIME_OPPENED);
        }
        
        // await this._storage?.remove(FIRST_TIME_OPPENED);
        // const dateFirstTimeOpenned = await this._storage?.get(FIRST_TIME_OPPENED);

        console.log(JSON.stringify(this.dateFirstTimeOpenned));

        if (this.dateFirstTimeOpenned == null || this.dateFirstTimeOpenned == undefined) {
            const now = new Date();

            this.set(FIRST_TIME_OPPENED, now);
            return true;
        }

        return false;
    }

    private set(key: string, value: any) {
        this._storage?.set(key, value);
    }
}