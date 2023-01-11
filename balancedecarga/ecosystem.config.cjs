module.exports ={
    apps: [
        // {
        //     name : "servidorForkeado",
        //     script : "src/app.js",
        //     env:{
        //         PORT : 8080
        //     },
        //     args : "-M FORK",
        //     node_args: "--expose-gc"
        // },
        // {
        //     name : "servidorClustereado",
        //     script : "src/app.js",
        //     env : {
        //         PORT : 8081
        //     },
        //     instances: "max",
        //     args : "-M CLUSTER",
        //     node_args : "--harmony --expose-gc"
        // }
        {
            name : "serverAPI1",
            script : "src/app.js",
            env : {
                PORT : 8082
            },
            instances: 1,
            args : "-M CLUSTER",
            node_args : "--harmony --expose-gc"
        },
        {
            name : "serverAPI2",
            script : "src/app.js",
            env : {
                PORT : 8083
            },
            instances: 1,
            args : "-M CLUSTER",
            node_args : "--harmony --expose-gc"
        },
        {
            name : "serverAPI3",
            script : "src/app.js",
            env : {
                PORT : 8084
            },
            instances: 1,
            args : "-M CLUSTER",
            node_args : "--harmony --expose-gc"
        },
        {
            name : "serverAPI4",
            script : "src/app.js",
            env : {
                PORT : 8085
            },
            instances: 1,
            args : "-M CLUSTER",
            node_args : "--harmony --expose-gc"
        }
    ]
}