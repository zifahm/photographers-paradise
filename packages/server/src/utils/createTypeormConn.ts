import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const createTypeormConn = async (): Promise<Connection> => {
  let retries = 5;
  while (retries) {
    try {
      const connectionOptions = await getConnectionOptions(
        process.env.NODE_ENV
      );
      return process.env.NODE_ENV === "production"
        ? createConnection({
            ...connectionOptions,
            url: process.env.DATABASE_URL,
            entities: [__dirname + "/../entity/*.ts"]
          } as any)
        : createConnection({ ...connectionOptions, name: "default" });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return createConnection("development");
};
