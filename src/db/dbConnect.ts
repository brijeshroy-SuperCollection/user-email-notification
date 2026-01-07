import { Pool } from "pg";
import { getSSMParam } from "../services/ssm-connect";

let pool: Pool | null = null;

export const getPool = async () => {
  if (!pool) {
    const dbSSMParam = [
      "/user-generate/db/dbname",
      "/user-generate/db/host",
      "/user-generate/db/password",
      "/user-generate/db/port",
      "/user-generate/db/username",
    ];
    const ssmParamObj = await getSSMParam("Db", dbSSMParam);
    console.log("The paramobj is", JSON.stringify(ssmParamObj));
    pool = new Pool({
      host: ssmParamObj["/user-generate/db/host"],
      user: ssmParamObj["/user-generate/db/username"],
      password: ssmParamObj["/user-generate/db/password"],
      database: ssmParamObj["/user-generate/db/dbname"],
      port: Number(ssmParamObj["/user-generate/db/port"]),
      max: 20, // Recommended for AWS Lambda
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else console.log("Postgres Pool Exists");

  return pool;
};
