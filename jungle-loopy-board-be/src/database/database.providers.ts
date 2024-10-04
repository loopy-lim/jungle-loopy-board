import { DataSource } from "typeorm";

export const DatabaseProviders = [
  {
    provide: 'DATABASE_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: 'jungle-loopy-board.db',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      })

      return dataSource.initialize();
    }
  }
];