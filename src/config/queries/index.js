import users from "./users";
export default {
    lists: {
        users: users.list
    },
    forms: {
        user: users.form
    },
    lookups: {
        users: users.lookup
    }

}