import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import Group, {GroupModel} from "../Group/group.model";
import {StudentModel} from "./student.model";
import Teacher from "../Teacher/teacher.model";
import TeacherGroup from "../Teacher/teacherGroup.model";


export interface StudentGroupModel
    extends Model<InferAttributes<StudentGroupModel>, InferCreationAttributes<StudentGroupModel>> {
    id: CreationOptional<number>;
    centerId: ForeignKey<CenterModel["id"]>;
    groupId: ForeignKey<GroupModel["id"]>;
    studentId: ForeignKey<StudentModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const StudentGroup = db.define<StudentGroupModel>('student_group',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    studentId: {type: DataTypes.INTEGER, allowNull: false},
    groupId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(StudentGroup);
StudentGroup.belongsTo(Center);

Teacher.hasMany(TeacherGroup);
TeacherGroup.belongsTo(Teacher);

Group.hasMany(TeacherGroup);
TeacherGroup.belongsTo(Group);

Teacher.belongsToMany(Group, {through: TeacherGroup})
Group.belongsToMany(Teacher, {through: TeacherGroup})


export default StudentGroup;