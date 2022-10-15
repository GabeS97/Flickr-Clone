const { sequelize } = require('sequelize');

const schemaName = 'flickr-db';

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(schemaName)) {
        await sequelize.createSchema(schemaName);
    }
})
