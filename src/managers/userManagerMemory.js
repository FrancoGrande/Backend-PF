let users = [];

export default {
    getAll: () => users,
    getById: (id) => users.find(user => user.id === id),
    create: (user) => {
        users.push(user);
        return user;
    },
    update: (id, data) => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...data };
        return users[index];
    },
    delete: (id) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) users.splice(index, 1);
    }
};