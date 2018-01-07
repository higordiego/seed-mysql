module.exports = ({
    api: '/api/v1',
    token: '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#853213213123123',
    mysql: {
        database: 'mysql_seed',
        username: 'root',
        password: '',
        params: {
            host: 'mysql',
            port: 3306,
            dialect: 'mysql',
            logging: false,
            pool: {
                maxIdleTime: 30
            },
            define: {
                underscored: true
            }
        }
    }
})