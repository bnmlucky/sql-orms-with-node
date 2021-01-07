const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    // logging: false //disable logging
});

// Movie model
class Movie extends Sequelize.Model { }
Movie.init({
    title: Sequelize.STRING
}, { sequelize }); // same as {sequelize: sequelize}

// async IIFE (Immediately Invoked Function Expression)
(async () => {
    // Sync 'Movies' table
    await sequelize.sync({ force: true });
    try {
        const movieInstances = await Promise.all([
            Movie.create({
                title: 'Back to the Future',
            }),
            Movie.create({
                title: 'The Incredibles'
            }),
        ]);
        const moviesJSON = movieInstances.map(movie => movie.toJSON());
        console.log(moviesJSON);

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();
