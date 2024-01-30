
import {createMyTSQL} from "mytsql-lib"
import { env } from "../../env"
import { testSchema } from "./schema/generated"

export const myTSQL = createMyTSQL<testSchema>({
    client: 'mysql2',
    connection: {
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        port: env.MYSQL_PORT,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE
    },
    pool: { min: 0, max: 7 }
})  



export default myTSQL
