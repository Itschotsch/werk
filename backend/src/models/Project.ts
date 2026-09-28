import { Schema, model, type Document, type Types } from "mongoose";
import type { IPartialDate } from "../utils/date.js";

export type ProjectStatus = "draft" | "planning" | "in_production" | "completed" | "archived";
export type ParticipantStatus = "confirmed" | "pending" | "declined" | "unlinked";

export interface ILocation {
	name: string;
	lat?: number | undefined;
	lon?: number | undefined;
	placeId?: string | undefined;
}

export interface IProjectStatusEntry {
	status: ProjectStatus;
	date: IPartialDate;
	note?: string | undefined;
}

export interface IProjectParticipant {
	_id?: Types.ObjectId | string | undefined;
	user?: Types.ObjectId | string | undefined;
	name?: string | undefined;
	role: string;
	status: ParticipantStatus;
	contributionNote?: string | undefined;
	addedAt: Date;
}

export interface IProjectLogEntry {
	_id?: Types.ObjectId | string | undefined;
	datetime: IPartialDate;
	title: string;
	text: string;
	author: Types.ObjectId | string;
	location?: ILocation | undefined;
	attachments?: string[] | undefined;
	createdAt?: Date | undefined;
	updatedAt?: Date | undefined;
}

export interface IProject extends Document {
	_id: Types.ObjectId;
	title: string;
	description: string;
	statusHistory: IProjectStatusEntry[];
	locations: ILocation[];
	leaders: Types.ObjectId[];
	participants: IProjectParticipant[];
	viewers: Types.ObjectId[];
	logEntries: IProjectLogEntry[];
	tags: string[];
	coverUrl?: string | undefined;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const partialDateSchema = new Schema<IPartialDate>(
	{
		year: { type: Number },
		month: { type: Number },
		day: { type: Number },
		hour: { type: Number },
		minute: { type: Number },
		second: { type: Number },
		timestamp: { type: Date, required: true, default: () => new Date() }
	},
	{ _id: false }
);

const locationSchema = new Schema<ILocation>(
	{
		name: { type: String, required: true, trim: true, maxlength: 200 },
		lat: { type: Number, required: false },
		lon: { type: Number, required: false },
		placeId: { type: String, required: false, trim: true }
	},
	{ _id: false }
);

const statusEntrySchema = new Schema<IProjectStatusEntry>(
	{
		status: {
			type: String,
			enum: ["draft", "planning", "in_production", "completed", "archived"],
			required: true
		},
		date: { type: partialDateSchema, required: true },
		note: { type: String, trim: true, maxlength: 1000 }
	},
	{ _id: false }
);

const participantSchema = new Schema<IProjectParticipant>({
	user: { type: Schema.Types.ObjectId, ref: "User", default: null },
	name: { type: String, default: "", trim: true, maxlength: 200 },
	role: { type: String, required: true, trim: true, maxlength: 200 },
	status: {
		type: String,
		enum: ["confirmed", "pending", "declined", "unlinked"],
		default: "unlinked"
	},
	contributionNote: { type: String, default: "", trim: true, maxlength: 5000 },
	addedAt: { type: Date, default: () => new Date() }
});

const logEntrySchema = new Schema<IProjectLogEntry>(
	{
		datetime: { type: partialDateSchema, required: true },
		title: { type: String, required: true, trim: true, maxlength: 300 },
		text: { type: String, required: true, maxlength: 20000 },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		location: { type: locationSchema, required: false },
		attachments: { type: [String], default: [] }
	},
	{ timestamps: true }
);

const projectSchema = new Schema<IProject>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 300
		},
		description: {
			type: String,
			default: "",
			trim: true,
			maxlength: 20000
		},
		statusHistory: {
			type: [statusEntrySchema],
			default: []
		},
		locations: {
			type: [locationSchema],
			default: []
		},
		leaders: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true
			}
		],
		participants: {
			type: [participantSchema],
			default: []
		},
		viewers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		logEntries: {
			type: [logEntrySchema],
			default: []
		},
		tags: [
			{
				type: String,
				lowercase: true,
				trim: true
			}
		],
		coverUrl: {
			type: String,
			default: "",
			trim: true,
			maxlength: 500
		},
		isPublic: {
			type: Boolean,
			default: true,
			index: true
		}
	},
	{
		timestamps: true
	}
);

// Performance Indexes for Backlink Queries, Searches, and Lifecycle sorting
projectSchema.index({ leaders: 1 });
projectSchema.index({ "participants.user": 1, "participants.status": 1 });
projectSchema.index({ viewers: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ "statusHistory.status": 1, "statusHistory.date.timestamp": -1 });

export const Project = model<IProject>("Project", projectSchema);
