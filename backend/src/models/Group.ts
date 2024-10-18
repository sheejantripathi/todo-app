import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Path to your Sequelize instance

interface GroupAttributes {
  id: number;
  name: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    underscored: true,
  }
);

// // Define the association
// Group.hasMany(Todo, {
//   foreignKey: 'groupId',
//   as: 'todos',
//   onDelete: 'SET NULL',
// });

export default Group;
