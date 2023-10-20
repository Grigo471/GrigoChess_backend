import { Schema, Types, model } from 'mongoose';

interface IToken {
    user: Types.ObjectId;
    refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
})

export const TokenModel = model<IToken>('Token', TokenSchema);