import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import UserRole from "./userRole.model";
import {CenterModel} from "../center.model";


export interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    id: CreationOptional<number>;
    name: string;
    centerId?: ForeignKey<CenterModel["id"]>
}

const Role = db.define<RoleModel>('role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    centerId: DataTypes.INTEGER
});

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

export default Role;