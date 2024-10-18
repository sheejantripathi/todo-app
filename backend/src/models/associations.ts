// associations.ts
import Group from './Group';
import Todo from './Todo';

// Set up associations here
Group.hasMany(Todo, { foreignKey: 'groupId', as: 'todos' });
Todo.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });