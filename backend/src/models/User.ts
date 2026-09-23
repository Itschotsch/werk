import { Schema, model, type Document, type Types } from 'mongoose';

export interface IUserIdentity {
	provider: string;
	providerId: string;
	credentialData?: Record<string, unknown> | undefined;
	createdAt: Date;
}

export interface IUser extends Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	displayName: string;
	passwordHash?: string | undefined;
	authProviders: string[];
	identities: IUserIdentity[];
	createdAt: Date;
	updatedAt: Date;
}

const userIdentitySchema = new Schema<IUserIdentity>(
	{
		provider: { type: String, required: true },
		providerId: { type: String, required: true },
		credentialData: { type: Schema.Types.Mixed },
		createdAt: { type: Date, default: () => new Date() }
	},
	{ _id: false }
);

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true
		},
		displayName: {
			type: String,
			required: true,
			trim: true
		},
		passwordHash: {
			type: String,
			required: false
		},
		authProviders: {
			type: [String],
			default: ['password']
		},
		identities: {
			type: [userIdentitySchema],
			default: []
		}
	},
	{
		timestamps: true
	}
);

export const User = model<IUser>('User', userSchema);
