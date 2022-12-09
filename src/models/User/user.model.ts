import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../index"
import Center from "../center.model";
import Role from "./role.model";
import UserRole from "./userRole.model";


export interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name?: string;
    email: string;
    password: string;
    img?: string;
    phone?: string;
    layout?: string;
}

const User = db.define<UserModel>('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            containsSpecialChar(value:string) {
                const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                const uppercaseChars = /[A-Z]/;
                const lowercaseChars = /[a-z]/;
                const numericChars = /\d/;
                if (value.length < 8) {
                    throw new Error('length of password more than 8');
                }
                if (!lowercaseChars.test(value)) {
                    throw new Error('should contain lowercase char');
                }
                if (!uppercaseChars.test(value)) {
                    throw new Error('should contain uppercase char');
                }
                if (!numericChars.test(value)) {
                    throw new Error('should contain numeric char');
                }
                if (!specialChars.test(value)) {
                    throw new Error('should contain special char');
                }
            },
        }
    },
    name: {type: DataTypes.STRING, defaultValue: ''},
    img: {type: DataTypes.STRING, defaultValue: ''},
    phone: {type: DataTypes.STRING, defaultValue: ''},
    layout: {type: DataTypes.STRING, defaultValue: 'default'}
});

User.hasOne(Center);
Center.belongsTo(User);

User.hasMany(UserRole);
UserRole.belongsTo(User);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });


export default User;