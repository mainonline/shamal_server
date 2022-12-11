import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import {UserModel} from "../User/user.model";
import StudentGroup from "./studentGroup.model";
import Group from "../Group/group.model";


export interface StudentModel
    extends Model<InferAttributes<StudentModel>, InferCreationAttributes<StudentModel>> {
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

const Student = db.define<StudentModel>('student',{
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

Center.hasMany(Student);
Student.belongsTo(Center);

Student.hasMany(StudentGroup);
StudentGroup.belongsTo(Student);

Group.hasMany(StudentGroup);
StudentGroup.belongsTo(Group);

Student.belongsToMany(Group, {through: StudentGroup})
Group.belongsToMany(Student, {through: StudentGroup})


export default Student;