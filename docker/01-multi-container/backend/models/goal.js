import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const goalSchema = new Schema({
  text: String
});

const GoalModel = model('Goal', goalSchema);

export default GoalModel;