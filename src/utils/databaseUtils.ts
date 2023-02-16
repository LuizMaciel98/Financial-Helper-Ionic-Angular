export class DatabaseUtils {
    
    public constructor (){ }

    static getInsertQuery(object: Object) {
        let result: InsertQuery = new InsertQuery();

        Object.entries(object).map(item => {
            if (result.insertQueryFields != '') {
                result.insertQueryFields = result.insertQueryFields + ', ';
                result.insertQueryValuesSize = result.insertQueryValuesSize + ', ';
            }

            result.insertQueryFields = result.insertQueryFields + item[0];
            result.insertQueryValuesSize = result.insertQueryValuesSize + '?';

            if(item[1] instanceof Date){
                result.insertQueryValues.push(this.getDateFormatted(item[1]));
            } else {
                result.insertQueryValues.push(item[1]);
            }

        });

        console.log(JSON.stringify(result.insertQueryFields));
        console.log(JSON.stringify(result.insertQueryValuesSize));
        console.log(JSON.stringify(result.insertQueryValues));

        return result;
    }

    static getDateFormatted(date: Date) {
        let year: string = date.getFullYear().toString();
        let month: string = this.convertToOneBased(date.getMonth()).toString();
        let day: string = date.getDate().toString();

        if (month.length == 1) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + day;
    }

    static convertToOneBased(zeroBased: number) {
        return zeroBased++;
    }

}

export class InsertQuery {

    insertQueryFields: string = '';
    insertQueryValuesSize: string = '';
    insertQueryValues: any[] = [];

}