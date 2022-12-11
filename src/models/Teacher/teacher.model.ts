import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import {UserModel} from "../User/user.model";


export interface TeacherModel
    extends Model<InferAttributes<TeacherModel>, InferCreationAttributes<TeacherModel>> {
    id: CreationOptional<number>;
    name?: string;
    img?: string;
    phone?: string;
    layout?: string;
    roles?: any[];
    centerId: ForeignKey<CenterModel["id"]>;
    userId?: ForeignKey<UserModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Teacher = db.define<TeacherModel>('teacher',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: ''},
    img: {type: DataTypes.STRING, defaultValue: ''},
    phone: {type: DataTypes.STRING, defaultValue: ''},
    layout: {type: DataTypes.STRING, defaultValue: 'default'},
    userId: {type: DataTypes.INTEGER},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(Teacher);
Teacher.belongsTo(Center);


export default Teacher;