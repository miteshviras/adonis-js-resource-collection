import User from 'App/Models/User';

export default class UserResource {
    /************************/
    /** @param options holds key and pair **/
    /** @eg {key : value} **/
    /** structure designed by https://github.com/miteshviras */
    /************************/

    // write single orm logic in resource. (Object)
    // use your own customisable keys
    public static async resource(user: User) {
        return Object.assign({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: user.first_name + " " + user.last_name,
            email: user.email,
            email_verified_at: user.email_verified_at ?? null,
        });
    }

    // write multiples of orm logic in collection. (Object of Object)
    // use your own customisable keys
    public static async collection(users: User[], meta: any[]) {       
        return {
            users: {
                data: await Promise.all(
                    users.map(async (user: User) => {
                        return await this.resource(user);
                    })
                ),
                meta: meta,
            },
        };
    }
}
