import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import Role from "./role.model";
import UserRole from "./userRole.model";
import Manager from "../Manager/manager.model";
import Student from "../Student/student.model";
import Teacher from "../Teacher/teacher.model";
import Lead from "../lead.model";


export interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name?: string;
    email: string;
    password: string;
    img?: string;
    phone?: string;
    layout?: string;
    roles?: any[];
    centerId: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const User = db.define<UserModel>('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {type: DataTypes.STRING, defaultValue: ''},
    img: {type: DataTypes.STRING, defaultValue: ''},
    phone: {type: DataTypes.STRING, defaultValue: ''},
    layout: {type: DataTypes.STRING, defaultValue: 'default'},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(User);
User.belongsTo(Center);

User.hasMany(UserRole);
UserRole.belongsTo(User);

User.hasMany(Manager);
Manager.belongsTo(User);

User.hasMany(Teacher);
Teacher.belongsTo(User);

User.hasMany(Student);
Student.belongsTo(User);

User.hasMany(Lead);
Lead.belongsTo(User);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });


export default User;