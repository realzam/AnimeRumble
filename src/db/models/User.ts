import {
	prop,
	getModelForClass,
	modelOptions,
	pre,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

import type { IUserRoles, IUserState } from '@/interfaces/user';

@modelOptions({
	schemaOptions: {
		collection: 'users',
		timestamps: true,
		toJSON: {
			flattenMaps: false,
			virtuals: true,
			versionKey: false,
			transform: function (doc, ret) {
				delete ret._id;
				delete ret.password;
			},
		},
	},
})
@pre<UserDB>('save', async function (next) {
	if (!this.isModified('email')) {
		next();
	}
	this.email = this.email.toLowerCase().trim();
})
export class UserDB {
	id: string;

	@prop({ type: String, required: true, trim: true })
	name: string;

	@prop({ type: String, required: true, trim: true, unique: true })
	email: string;

	@prop({ type: String, required: true, trim: true })
	password: string;

	@prop({
		type: String,
		enum: ['admin', 'player'],
		default: 'player',
		required: true,
	})
	role: IUserRoles;

	@prop({
		type: String,
		enum: ['no-verified', 'verified'],
		default: 'no-verified',
		required: true,
	})
	state: IUserState;

	comparePasswords(password: string) {
		return bcrypt.compareSync(password, this.password);
	}
}

const UserModel = getModelForClass(UserDB);
export default UserModel;
