import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import User, {UserModel} from "./user.model";
import {RoleModel} from "./role.model";
import Center, {CenterModel} from "../center.model";


export interface UserRoleModel extends Model<InferAttributes<UserRoleModel>, InferCreationAttributes<UserRoleModel>> {
    id: CreationOptional<number>;
    role?: any;
    roleId: ForeignKey<RoleModel["id"]>;
    userId: ForeignKey<UserModel["id"]>;
    centerId?: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const UserRole = db.define<UserRoleModel>('user_role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    roleId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(UserRole);
UserRole.belongsTo(Center);

export default UserRole;