import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({ fullName: String, email: String, phone: String, password: String, role: String }, { collection: 'users' });
userSchema.methods.comparePassword = function (password) { return bcrypt.compare(password, this.password); };
userSchema.set('toJSON', { transform: (doc, value) => { delete value.password; return value; } });
export default mongoose.models.User || mongoose.model('User', userSchema);
