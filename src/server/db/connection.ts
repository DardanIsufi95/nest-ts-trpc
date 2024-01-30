import mysql, { ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { env } from "../../env";


export const pool = mysql.createPool({
	host: env.MYSQL_HOST,
	user: env.MYSQL_USER,
    port: env.MYSQL_PORT,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE
});

type LowerOrUpper<T extends string> = `${Lowercase<T>}` | `${Uppercase<T>}`;

type SqlQueryResult<T extends string> = 
    T extends `SELECT * FROM ${string}` ?
    RowDataPacket :
    T extends `SELECT ${infer Fields} FROM ${string}`
    ? {
        [K in TrimString<ExtractFields<Fields>>]: any;
      }
    : never;

type ExtractFromAlias<T extends string> =
    T extends `${string} AS ${infer Alias}` ? Alias : T;

type ExtractFields<T extends string> = 
    T extends `${infer Field},${infer Rest}` ? ExtractFromAlias<Field> | ExtractFields<Rest> : 
    T extends `${infer LastField}` ? LastField : never;

type TrimString<T extends string> = 
    T extends ` ${infer Rest}` ? TrimString<Rest> :
    T extends `${infer Rest} ` ? TrimString<Rest> :
    T extends `\n${infer Rest}` ? TrimString<Rest> :
    T extends `${infer Rest}\n` ? TrimString<Rest> :
    T extends `\r${infer Rest}` ? TrimString<Rest> :
    T extends `${infer Rest}\r` ? TrimString<Rest> :
    T;


export const db = {
    pool: pool,
    query : pool.query.bind(pool),
    queryOne: async <T = RowDataPacket>(sql: `SELECT ${string}`, params: any) => {

        const [rows] = await pool.query<RowDataPacket[]>(sql, params);

        return rows[0] as T ?? null;
    },
    queryOneInfer: async <T extends `SELECT ${string}`>(sql:T , params: any) => {
        const [rows] = await pool.query<RowDataPacket[]>(sql, params);

        return rows[0] as unknown as SqlQueryResult<T>;
    },
    queryMany : async <T = RowDataPacket>(sql: `SELECT ${string}`, params: any) => {
        const [rows] = await pool.query<RowDataPacket[]>(sql, params);

        return rows as T[] ;
    },
    queryManyInfer : async <T extends `SELECT ${string}`>(sql: T, params: any) => {
        const [rows] = await pool.query<RowDataPacket[]>(sql, params);

        return rows as unknown as SqlQueryResult<T>[] ;
    } ,
    execute: async (sql: `INSERT ${string}` | `UPDATE ${string}` | `DELETE ${string}` , params: any) => {
        const [result] = await pool.query<ResultSetHeader>(sql, params);

        if(Array.isArray(result)) {
            throw new Error('Expected a result, but got an array! use executeMany instead');
        }

        return result ;
    },
    executeMany : async (sql: `INSERT ${string}` | `UPDATE ${string}` | `DELETE ${string}` , params: any[]) => {
        const [result] = await pool.query<ResultSetHeader>(sql, params);

        if(!Array.isArray(result)) {
            throw new Error('Expected an array, but got a result! use execute instead');
        }

        return result ;
    },
    callProcedure: async <T = ProcedureCallPacket >(procedure: string, params: any) => {
        const [rows] = await pool.query<ProcedureCallPacket>(`CALL ${procedure}`, params);

        return rows as T;
    },

}

