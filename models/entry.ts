import { EEntryStatus, IEntry } from "@/interface/common";
import mongoose, { Schema, models } from "mongoose";

const entrySchemaFields: Record<keyof IEntry, any> = {
  visitorId: {
    type: mongoose.Schema.Types.ObjectId, // Explicitly specify the type
    ref: "Visitor", // Add the reference model name ('Visitor' in this case)
  },
  registrationTimestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  checkinTimestamp: {
    type: Date,
  },
  checkoutTimestamp: {
    type: Date,
  },
  status: {
    type: Number, // Registered, CheckedIn, CheckedOut
    enum: EEntryStatus,
    default: 1,
  },
};
const entrySchema = new Schema(
  entrySchemaFields,
  {
    timestamps: true,
  }
);

const Entry = models.Entry || mongoose.model("Entry", entrySchema);
export default Entry;
