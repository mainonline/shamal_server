import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import {UserModel} from "./user.model";
import {RoleModel} from "./role.model";


interface UserRoleModel extends Model<InferAttributes<UserRoleModel>, InferCreationAttributes<UserRoleModel>> {
    id: CreationOptional<number>;
    roleId: ForeignKey<RoleModel["id"]>
    userId: ForeignKey<UserModel["id"]>
}

const UserRole = db.define<UserRoleModel>('user_role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    roleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
});


export default UserRole;