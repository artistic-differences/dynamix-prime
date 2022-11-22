const form = {
    datasource: 'user',
    schema: {
        name: {
            type: "text",
            label: "Username"
        },
        gender: {
            type: "select",
            label: "Gender",
            config: {
                fixedData: [
                    {id: 'M', name: 'Male'},
                    {id: 'F', name: 'Female'}
                ],
                keyField: 'id',
                displayField: 'name'
            }
        },
        manager: {
            type: "select",
            label: "Manager",
            config: {
                datasource:'users',
                keyField: 'id',
                displayField: 'name'
            }
        },

    },
    layout: [["name"],["gender"],["manager"]],
    initData: {
        name: '',
        gender: '',
    }
}
const list = {
    datasource: 'users',
    fields: [
        {fieldName: 'name', title: 'Name', type:'text'},
        {fieldName: 'age', title: 'Age', type:'text'},
    ]
}

export default {
    list, form
}