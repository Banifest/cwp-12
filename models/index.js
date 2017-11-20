const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');
const Promise = require('bluebird');

module.exports = (Sequelize, config) =>
{
    const sequelize = new Sequelize('database', 'username', '',
                                    {
                                        host: 'localhost',
                                        dialect: 'sqlite',
                                        storage: './lab.sqlite'
                                    });

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    turtles.belongsTo(weapons, {foreignKey: 'weaponId', targetKey: 'id'});
    turtles.belongsTo(pizzas, {foreignKey: 'firstFavoritePizzaId', targetKey: 'id'});
    turtles.belongsTo(pizzas, {foreignKey: 'secondFavoritePizzaId', targetKey: 'id'});

    Promise.all([weapons.sync({force: true}), pizzas.sync({force: true}), turtles.sync({force: true})])
        .then(()=>
              {
                  Promise.all([
                                      weapons.create(
                                      {
                                          id: 1,
                                          name: 'katana',
                                          dps: 10
                                      }),
                                      weapons.create(
                                          {
                                              id: 2,
                                              name: 'nunchaku',
                                              dps: 15
                                          }),
                                      weapons.create(
                                          {
                                              id: 3,
                                              name: 'bo staf',
                                              dps: 3
                                          }),
                                      weapons.create(
                                          {
                                              id: 4,
                                              name: 'sai',
                                              dps: 8
                                          }),
                                  pizzas.create(
                                      {
                                          id: 1,
                                          name: 'Double Cheese Pizza',
                                          description: 'Double Cheese Pizza',
                                          calories: 100
                                      }),
                                  pizzas.create(
                                      {
                                          id: 2,
                                          name: 'Gourmet',
                                          description: 'Gourmet',
                                          calories: 200
                                      }),
                                  pizzas.create(
                                      {
                                          id: 3,
                                          name: 'Mexican Green Wave',
                                          description: ' Mexican Green Wave',
                                          calories: 250
                                      }),
                                  pizzas.create(
                                      {
                                          id: 4,
                                          name: 'Peppy Paneer',
                                          description: 'Peppy Paneer',
                                          calories: 300
                                      }),
                                  pizzas.create(
                                      {
                                          id: 5,
                                          name: 'Mozzarella',
                                          description: 'Mozzarella',
                                          calories: 100
                                      })
                              ])
                      .then(()=>
                            {
                                Promise.all([
                                    turtles.create(
                                    {
                                        id: 1,
                                        name: 'Leonardo',
                                        color: 'blue',
                                        weaponId: 1,
                                        firstFavoritePizzaId: 1,
                                        secondFavoritePizzaId: 3
                                    }),
                                    turtles.create(
                                    {
                                        id: 2,
                                        name: 'Michelangelo',
                                        color: 'yellow',
                                        weaponId: 2,
                                        firstFavoritePizzaId: 5,
                                        secondFavoritePizzaId: 2
                                    }),
                                    turtles.create(
                                    {
                                        id: 3,
                                        name: 'Donatello',
                                        color: 'purple',
                                        weaponId: 3,
                                        firstFavoritePizzaId: 4,
                                        secondFavoritePizzaId: 5
                                    }),
                                    turtles.create(
                                    {
                                        id: 4,
                                        name: 'Raphael',
                                        color: 'red',
                                        weaponId: 4,
                                        firstFavoritePizzaId: 2,
                                        secondFavoritePizzaId: 3
                                    })
                            ])

;
                            });
              });

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};