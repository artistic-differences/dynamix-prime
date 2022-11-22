const list = {
    queries: {
        all: `{
            Users {
                id
                name
                age
            }
        }`,
        transformFunction: null,
        errorFunction: null,
    }
}
const lookup = {
    queries: {
        all: `{
            Users {
                id
                name
            }
        }`,
        transformFunction: null,
        errorFunction: null,
    }
}
const form =  {
    queries: {
        all: `{
            User {
                name
            }
        }`,
        transformFunction: null,
        errorFunction: null,
    }
}

export default {
    list, form, lookup
}