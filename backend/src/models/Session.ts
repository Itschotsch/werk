import { Schema, model, type Document, type Types } from 'mongoose';

export interface ISession extends Document {
	_id: Types.ObjectId;
	tokenHash: string;
	userId: Types.ObjectId;
	expiresAt: Date;
	userAgent?: string | undefined;
	ip?: string | undefined;
	createdAt: Date;
}

const sessionSchema = new Schema<ISession>(
	{
		tokenHash: {
			type: String,
			required: true,
			unique: true,
			index: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		expiresAt: {
			type: Date,
			required: true,
			index: { expires: 0 }
		},
		userAgent: {
			type: String,
			required: false
		},
		ip: {
			type: String,
			required: false
		}
	},
	{
		timestamps: { createdAt: true, updatedAt: false }
	}
);

export const Session = model<ISession>('Session', sessionSchema);
