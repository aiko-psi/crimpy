import type Pocketbase from "pocketbase";
import type { RecordService } from "pocketbase";
import { z } from "zod";

/******* ENUMS *******/
export const collectionValues = [
	"activity",
	"efford",
	"grade",
	"grade_rating",
	"grade_system",
	"gym",
	"indoor_route",
	"session",
	"tag",
	"users",
	"wall",
] as const;
export const Collection = z.enum(collectionValues);
export type Collection = z.infer<typeof Collection>;
export const COLLECTION = Collection.enum;

export const effordStatusValues = [
	"tried",
	"zone",
	"top",
	"flash",
] as const;
export const EffordStatus = z.enum(effordStatusValues);
export type EffordStatus = z.infer<typeof EffordStatus>;
export const EFFORD_STATUS = EffordStatus.enum;

/******* BASE *******/
export const BaseModel = z.object({
  created: z.string().pipe(z.coerce.date()),
  id: z.string(),
  updated: z.string().pipe(z.coerce.date()),
});
export type BaseModel = z.infer<typeof BaseModel>;

export const AdminModel = z.object({
  ...BaseModel.shape,
  avatar: z.string(),
  email: z.string().email(),
});
export type AdminModel = z.infer<typeof AdminModel>;

export const RecordModel = z.object({
  ...BaseModel.shape,
  collectionId: z.string(),
  collectionName: z.string(),
  expand: z.any().optional(),
});
export type RecordModel = z.infer<typeof RecordModel>;

/******* RECORDS *******/
export const ActivityRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("activity"),
	effords: z.string().array().optional(),
	end: z.string().pipe(z.coerce.date()).optional(),
	session: z.string().transform((id) => id === "" ? undefined : id).optional(),
	start: z.string().pipe(z.coerce.date()).optional(),
	user: z.string().transform((id) => id === "" ? undefined : id).optional(),
});
export type ActivityRecord = z.infer<typeof ActivityRecord>;

export const EffordRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("efford"),
	date: z.string().pipe(z.coerce.date()).optional(),
	route: z.string().transform((id) => id === "" ? undefined : id).optional(),
	status: EffordStatus.optional(),
	toploggerId: z.string().optional(),
	tries: z.number().optional(),
	user: z.string().transform((id) => id === "" ? undefined : id).optional(),
});
export type EffordRecord = z.infer<typeof EffordRecord>;

export const GradeRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("grade"),
	gradeName: z.string().optional(),
	gradeValue: z.number().optional(),
});
export type GradeRecord = z.infer<typeof GradeRecord>;

export const GradeRatingRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("grade_rating"),
	grade: z.string().transform((id) => id === "" ? undefined : id).optional(),
	route: z.string().transform((id) => id === "" ? undefined : id).optional(),
	user: z.string().transform((id) => id === "" ? undefined : id).optional(),
});
export type GradeRatingRecord = z.infer<typeof GradeRatingRecord>;

export const GradeSystemRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("grade_system"),
	grades: z.string().array().optional(),
});
export type GradeSystemRecord = z.infer<typeof GradeSystemRecord>;

export const GymRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("gym"),
	defaultGradeSystem: z.string().transform((id) => id === "" ? undefined : id).optional(),
	location: z.string().optional(),
	name: z.string().optional(),
	shortName: z.string().optional(),
	toploggerId: z.string().optional(),
	walls: z.string().array().optional(),
});
export type GymRecord = z.infer<typeof GymRecord>;

export const IndoorRouteRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("indoor_route"),
	active: z.boolean().optional(),
	gradeSystem: z.string().transform((id) => id === "" ? undefined : id).optional(),
	hexColor: z.number().optional(),
	initialGrade: z.string().transform((id) => id === "" ? undefined : id).optional(),
	name: z.string().optional(),
	qualityRating: z.number().optional(),
	settingDate: z.string().pipe(z.coerce.date()).optional(),
	tags: z.string().array().optional(),
	toploggerId: z.string().optional(),
	unsettingDate: z.string().pipe(z.coerce.date()).optional(),
	userRatings: z.string().array().optional(),
});
export type IndoorRouteRecord = z.infer<typeof IndoorRouteRecord>;

export const SessionRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("session"),
	active: z.boolean().optional(),
	activities: z.string().array().optional(),
	end: z.string().pipe(z.coerce.date()).optional(),
	field: z.string().transform((id) => id === "" ? undefined : id).optional(),
	start: z.string().pipe(z.coerce.date()).optional(),
});
export type SessionRecord = z.infer<typeof SessionRecord>;

export const TagRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("tag"),
	tagName: z.string().optional(),
});
export type TagRecord = z.infer<typeof TagRecord>;

export const UsersRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("users"),
	avatar: z.string().optional(),
	mail: z.string().email().optional(),
	name: z.string().optional(),
	toploggerId: z.string().optional(),
});
export type UsersRecord = z.infer<typeof UsersRecord>;

export const WallRecord = z.object({
	...RecordModel.omit({ expand: true }).shape,
	collectionName: z.literal("wall"),
	description: z.string().optional(),
	name: z.string().optional(),
	toploggerId: z.string().optional(),
});
export type WallRecord = z.infer<typeof WallRecord>;

export const records = new Map<Collection, z.AnyZodObject>([
	["activity", ActivityRecord],
	["efford", EffordRecord],
	["grade", GradeRecord],
	["grade_rating", GradeRatingRecord],
	["grade_system", GradeSystemRecord],
	["gym", GymRecord],
	["indoor_route", IndoorRouteRecord],
	["session", SessionRecord],
	["tag", TagRecord],
	["users", UsersRecord],
	["wall", WallRecord],
]);

/******* CLIENT *******/
export type TypedPocketbase = Pocketbase & {
		collection(idOrName: "activity"): RecordService<z.input<typeof ActivityRecord>>;
		collection(idOrName: "efford"): RecordService<z.input<typeof EffordRecord>>;
		collection(idOrName: "grade"): RecordService<z.input<typeof GradeRecord>>;
		collection(idOrName: "grade_rating"): RecordService<z.input<typeof GradeRatingRecord>>;
		collection(idOrName: "grade_system"): RecordService<z.input<typeof GradeSystemRecord>>;
		collection(idOrName: "gym"): RecordService<z.input<typeof GymRecord>>;
		collection(idOrName: "indoor_route"): RecordService<z.input<typeof IndoorRouteRecord>>;
		collection(idOrName: "session"): RecordService<z.input<typeof SessionRecord>>;
		collection(idOrName: "tag"): RecordService<z.input<typeof TagRecord>>;
		collection(idOrName: "users"): RecordService<z.input<typeof UsersRecord>>;
		collection(idOrName: "wall"): RecordService<z.input<typeof WallRecord>>;
};
