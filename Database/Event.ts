import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

class Event_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createEventTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "Create Table IF NOT EXISTS Event( " +
            "    Name Varchar(500) Primary key NOT NULL, " +
            "    Description VARCHAR(5000) NOT NULL, "
            "    Datetime_Event Datetime NOT NULL, "
            "    Category Varchar(100), "
            "    Location_Name Varchar(100), "
            "    Foreign key(Location_Name) References Location(Name)ON DELETE CASCADE ON UPDATE CASCADE "
            ");";
    
            tx.executeSql(sqlCommand);
          },
    
          //Console is logged if the transaction fails.
          (error) => {
            console.log(error.message);
          },
          //Console is logged if the transaction succeeds.
          () => {
            console.log('Successfully created the event table');
          }
             
        );
    }

    dropEventTable() {
      this.DB.transaction(
        (tx) => {
          const sqlCommand = 
          "Drop Table Event;";

          tx.executeSql(sqlCommand);
        },
        (error) => {
          console.log(error.message);
        }, 
        () => {
          console.log('Successfully dropped the event table.');
        }
      );
    }

    insertIntoEventTable(Event: Event_Data) {
      
    }
}

export type Event_Data = {
    Name: string,
    Description: string,
    Datetime_Event: Date,
    Category: string,
    Location: string
}


export const Event: Event_Entity = new Event_Entity(db_name);