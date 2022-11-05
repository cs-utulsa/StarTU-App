import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';
import {Location_Tag_Entity} from './Location_Tag'

class Location_Entity {
    DB: SQLite.WebSQLDatabase;
    Tags_Table: Location_Tag_Entity;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
        this.Tags_Table = new Location_Tag_Entity(database_name);
    }

    createLocationTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "CREATE TABLE IF NOT EXISTS Location"
            + "(" 
            + "Name VARCHAR(100) PRIMARY KEY NOT NULL,"
            + "Latitude REAL,"
            + "Longitude REAL"
            + ");";
            tx.executeSql(sqlCommand);

            this.Tags_Table.createLocationTagTable();
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the location database');
          }
        );
    }

    dropLocationTable() {
      this.DB.transaction(
          (tx) => {
              this.Tags_Table.dropLocationTagTable();
              const sqlCommand:string = "DROP TABLE Location";
              tx.executeSql(sqlCommand);
          },

          (error) => {
              console.log(error.message);
            },
            () => {
              console.log('Successfully drop the Location Tag table');
            }
      );
  }
    
    insertIntoLocationTable(Location_Data: Location_Data) {
        this.DB.transaction(
        (tx) => {
          const sqlCommand:string = 
            
          "INSERT INTO Location (Name, Latitude, Longitude) values "
          + "(?, ?, ?)";
          tx.executeSql(sqlCommand, [Location_Data.Name, Location_Data.Latitude, Location_Data.Longitude]);

          this.Tags_Table.insertIntoLocationTagTable(Location_Data);
        },

        (error) => {
          console.log(error.message);
        },
        () => {
          console.log('Successfully inserted entry into Location table');
        }
       );
    }

    async queryAllAttributes_Async(): Promise<Location_Data[]> {
      return new Promise((resolve) => {
        let Location_Data: Location_Data[] = [];

        this.DB.readTransaction(
          (tx) => {
            const sqlCommand: string = 
            "SELECT *" + 
            "FROM Location";
            tx.executeSql(sqlCommand, [] ,
              (tx, results) => {
                Location_Data = results.rows._array
              }
            );
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            resolve(Location_Data);
          }
        );
      })
    }
}

export interface Location_Data {
    Name: string,
    Latitude: number,
    Longitude: number
    Tags: string[]
}

export const Location: Location_Entity = new Location_Entity(db_name);