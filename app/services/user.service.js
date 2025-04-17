angular.module('userManagementApp')
    .service('UserService', ['$q', function ($q) {
        // In-memory storage for users
        const users = [
            {
                id: 1,
                username: 'admin',
                first_name: 'John',
                last_name: 'Doe',
                email: 'admin@example.com',
                password: 'admin123',
                user_type: 'Admin'
            },
            {
                id: 2,
                username: 'driver1',
                first_name: 'Jane',
                last_name: 'Smith',
                email: 'driver@example.com',
                password: 'driver123',
                user_type: 'Driver'
            },
            {
                id: 3,
                username: 'driver2',
                first_name: 'Charlie',
                last_name: 'Davis',
                email: 'charlie.davis@example.com',
                password: 'driver456',
                user_type: 'Driver'
            },
            {
                id: 4,
                username: 'admin2',
                first_name: 'Diana',
                last_name: 'Miller',
                email: 'diana.miller@example.com',
                password: 'admin456',
                user_type: 'Admin'
            },
            {
                id: 5,
                username: 'driver3',
                first_name: 'Frank',
                last_name: 'Rodriguez',
                email: 'frank.rodriguez@example.com',
                password: 'driver789',
                user_type: 'Driver'
            },
            {
                id: 6,
                username: 'admin3',
                first_name: 'Heidi',
                last_name: 'Hernandez',
                email: 'heidi.hernandez@example.com',
                password: 'admin789',
                user_type: 'Admin'
            },
            {
                id: 7,
                username: 'driver4',
                first_name: 'Judy',
                last_name: 'Gonzalez',
                email: 'judy.gonzalez@example.com',
                password: 'driver1011',
                user_type: 'Driver'
            },
            {
                id: 8,
                username: 'admin4',
                first_name: 'Laura',
                last_name: 'Anderson',
                email: 'laura.anderson@example.com',
                password: 'admin1011',
                user_type: 'Admin'
            },
            {
                id: 9,
                username: 'driver5',
                first_name: 'Nina',
                last_name: 'Taylor',
                email: 'nina.taylor@example.com',
                password: 'driver1213',
                user_type: 'Driver'
            },
            {
                id: 10,
                username: 'admin5',
                first_name: 'Patricia',
                last_name: 'Jackson',
                email: 'patricia.jackson@example.com',
                password: 'admin1213',
                user_type: 'Admin'
            },
            {
                id: 11,
                username: 'driver6',
                first_name: 'Rachel',
                last_name: 'Lee',
                email: 'rachel.lee@example.com',
                password: 'driver1415',
                user_type: 'Driver'
            },
            {
                id: 12,
                username: 'admin6',
                first_name: 'Tina',
                last_name: 'Thompson',
                email: 'tina.thompson@example.com',
                password: 'admin1415',
                user_type: 'Admin'
            },
            {
                id: 13,
                username: 'driver7',
                first_name: 'Uma',
                last_name: 'White',
                email: 'uma.white@example.com',
                password: 'driver1617',
                user_type: 'Driver'
            },
            {
                id: 14,
                username: 'admin7',
                first_name: 'Victor',
                last_name: 'Harris',
                email: 'victor.harris@example.com',
                password: 'admin1617',
                user_type: 'Admin'
            },
            {
                id: 15,
                username: 'driver8',
                first_name: 'Wendy',
                last_name: 'Sanchez',
                email: 'wendy.sanchez@example.com',
                password: 'driver1819',
                user_type: 'Driver'
            },
            {
                id: 16,
                username: 'admin8',
                first_name: 'Xavier',
                last_name: 'Clark',
                email: 'xavier.clark@example.com',
                password: 'admin1819',
                user_type: 'Admin'
            },
            {
                id: 17,
                username: 'driver9',
                first_name: 'Yara',
                last_name: 'Ramirez',
                email: 'yara.ramirez@example.com',
                password: 'driver2021',
                user_type: 'Driver'
            },
            {
                id: 18,
                username: 'admin9',
                first_name: 'Zach',
                last_name: 'Lewis',
                email: 'zach.lewis@example.com',
                password: 'admin2021',
                user_type: 'Admin'
            },
            {
                id: 19,
                username: 'driver10',
                first_name: 'Aaron',
                last_name: 'Robinson',
                email: 'aaron.robinson@example.com',
                password: 'driver2223',
                user_type: 'Driver'
            },
            {
                id: 20,
                username: 'admin10',
                first_name: 'Bella',
                last_name: 'Walker',
                email: 'bella.walker@example.com',
                password: 'admin2223',
                user_type: 'Admin'
            },
            {
                id: 21,
                username: 'driver11',
                first_name: 'Carl',
                last_name: 'Young',
                email: 'carl.young@example.com',
                password: 'driver2425',
                user_type: 'Driver'
            }
        ];

        let lastId = users.reduce((maxId, user) => (maxId > user.id) ? maxId : user.id, 0);

        function cloneUserWithoutPassword(user) {
            if (!user) return null;
            const clone = angular.copy(user);
            delete clone.password;
            return clone;
        }

        return {
            getUsers: function () {
                return $q.resolve(users.map(cloneUserWithoutPassword));
            },

            getUser: function (id) {
                const user = users.find(function (user) {
                    return user.id === id;
                });
                return $q.resolve(cloneUserWithoutPassword(user));
            },

            createUser: function (userData) {
                return $q((resolve, reject) => {
                    const usernameExists = users.some(function (user) {
                        return user.username === userData.username;
                    });

                    if (usernameExists) {
                        return reject({username: 'Username is already taken'});
                    }

                    lastId++;

                    const newUser = angular.copy(userData);
                    newUser.id = lastId;

                    delete newUser.password_confirmation;

                    users.push(newUser);

                    return resolve(cloneUserWithoutPassword(newUser));
                });
            },

            updateUser: function (id, userData) {
                return $q((resolve, reject) => {
                    const userIndex = users.findIndex(function (user) {
                        return user.id === id;
                    });

                    if (userIndex === -1) {
                        return reject({error: 'User not found'});
                    }

                    const usernameExists = users.some(function (user) {
                        return user.username === userData.username && user.id !== id;
                    });

                    if (usernameExists) {
                        return reject({username: 'Username is already taken'});
                    }

                    // Only update password if provided and not empty
                    const updateData = angular.copy(userData);
                    if (typeof updateData.password === 'undefined' || updateData.password === '') {
                        // Don't overwrite password if not provided
                        delete updateData.password;
                    }

                    delete updateData.password_confirmation;

                    angular.extend(users[userIndex], updateData);

                    return resolve(cloneUserWithoutPassword(users[userIndex]));
                });
            },

            deleteUser: function (id) {
                return $q((resolve, reject) => {
                    const userIndex = users.findIndex(function (user) {
                        return user.id === id;
                    });

                    if (userIndex === -1) {
                        return reject({error: 'User not found'});
                    }

                    users.splice(userIndex, 1);

                    return resolve();
                });
            }
        };
    }]);
