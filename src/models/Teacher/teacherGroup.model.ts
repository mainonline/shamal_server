import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import {GroupModel} from "../Group/group.model";
import {TeacherModel} from "./teacher.model";


export interface TeacherGroupModel
    extends Model<InferAttributes<TeacherGroupModel>, InferCreationAttributes<TeacherGroupModel>> {
    id: CreationOptional<number>;
    centerId: ForeignKey<CenterModel["id"]>;
    groupId: ForeignKey<GroupModel["id"]>;
    studentId: ForeignKey<TeacherModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const TeacherGroup = db.define<TeacherGroupModel>('teacher_group',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    studentId: {type: DataTypes.INTEGER, allowNull: false},
    groupId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(TeacherGroup);
TeacherGroup.belongsTo(Center);


export default TeacherGroup;