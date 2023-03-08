export class DatabaseUtils {
    
    public constructor (){ }

    public static getUpdateQuery(object: Object) {
        let result: UpdateQuery = new UpdateQuery();

        let primaryKey: number = 0;

        Object.entries(object).map(item => {

            if (result.queryFields != '' && result.queryFields != 'primaryKey') {

                if (result.queryFields != '') {
                    result.queryFields = result.queryFields + ', ';
                    // result.queryValuesSize = result.queryValuesSize + ', ';
                }

                result.queryFields = result.queryFields + item[0];
                // result.queryValuesSize = result.queryValuesSize + '?';

                if (item[1] instanceof Date) {
                    result.queryValues.push(this.getDateFormatted(item[1]));
                } else {
                    result.queryValues.push(item[1]);
                }

            } else {
                primaryKey = item[1];
            }
        });

        result.queryValues.push(primaryKey);

        console.log(JSON.stringify(result.queryFields));
        // console.log(JSON.stringify(result.queryValuesSize));
        console.log(JSON.stringify(result.queryValues));

        return result;
    }

    public static getInsertQuery(object: Object) {
        let result: InsertQuery = new InsertQuery();

        Object.entries(object).map(item => {
            if (result.queryFields != '') {
                result.queryFields = result.queryFields + ', ';
                result.queryValuesSize = result.queryValuesSize + ', ';
            }

            result.queryFields = result.queryFields + item[0];
            result.queryValuesSize = result.queryValuesSize + '?';

            if(item[1] instanceof Date){
                result.queryValues.push(this.getDateFormatted(item[1]));
            } else {
                result.queryValues.push(item[1]);
            }

        });

        console.log(JSON.stringify(result.queryFields));
        console.log(JSON.stringify(result.queryValuesSize));
        console.log(JSON.stringify(result.queryValues));

        return result;
    }

    public static getDateFormatted(date: Date) {
        let year: string = date.getFullYear().toString();
        let month: string = this.convertToOneBased(date.getMonth()).toString();
        let day: string = date.getDate().toString();

        if (month.length == 1) {
            month = '0' + month;
        }

        if (day.length == 1) {
            day = '0' + day;
        }

        return year + '-' + month + '-' + day;
    }

    public static convertToOneBased(zeroBased: number) {
        return zeroBased++;
    }

}

export class InsertQuery {

    queryFields: string = '';
    queryValuesSize: string = '';
    queryValues: any[] = [];

}

export class UpdateQuery {

    queryFields: string = '';
    // queryValuesSize: string = '';
    queryValues: any[] = [];

}