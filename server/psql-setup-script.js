const { sequelize } = require('./db/models');

const schemaName = 'flickr_db'; // replace with your schema name

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(schemaName)) {
        await sequelize.createSchema(schemaName);
    }
});
