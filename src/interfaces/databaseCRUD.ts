export interface DatabaseCRUD {
    createDatabase: ()                      => void | any;
    createObject:      (Object : Object)       => void | any;
    readObjects:     (query: any)            => Promise<Object[] | null>;
    updateObjects:  (Object : Object)       => void | any;
    deleteObject:   (primaryKey: string)    => void | any;
}