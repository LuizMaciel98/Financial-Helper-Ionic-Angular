export interface DatabaseCRUD {
    createDatabase: ()                      => void | any;
    createObject:   (object : Object)       => void | any;
    readObjects:    (query: any)            => Promise<Object[] | null>;
    updateObjects:  (object : Object)       => void | any;
    deleteObject:   (primaryKey: string)    => void | any;
}