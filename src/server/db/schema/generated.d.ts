export type GenerateSetCombinations<T extends string, U extends string = T> = T extends any ? `${T},${GenerateSetCombinations<Exclude<U, T>>}` | T : never;

export type testSchema = { 
	routines : {
		getUserByUsernameAndPassword : {
			parameters : [
				_username : string | null,
				_password : string | null
			] ,
			returns : any[][]
		}
	} ,
	tables : {
		comments : {
			columns : {
				id ?: number,
				post_id ?: number | null,
				user_id ?: number | null,
				comment ?: string
			}
		} ,
		posts : {
			columns : {
				id ?: number,
				user_id ?: number | null,
				title ?: string | null,
				description ?: string | null,
				img ?: string | null
			}
		} ,
		users : {
			columns : {
				id ?: number,
				username ?: string | null,
				password ?: string | null,
				name ?: string | null
			}
		}
	}
}