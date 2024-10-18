import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Path to your Sequelize instance
// import Group from './Group'; // Import the Group model to define associations

interface TodoAttributes {
  id: number;
  userId: number;
  task: string;
  deadline: Date | null;
  isComplete: boolean;
  groupId: number | null;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id' | 'deadline' | 'isComplete' | 'groupId'> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public userId!: number;
  public task!: string;
  public deadline!: Date | null;
  public isComplete!: boolean;
  public groupId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups', // This references the Group model
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    underscored: true,
  }
);

// Define the association
// Todo.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });

export default Todo;
