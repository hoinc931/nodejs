import mongoose from 'mongoose';
import crypto, { createHmac } from 'crypto';
import { v1 as uuidv1 } from 'uuid';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxLength: 32
    },
    hashed_password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    phone: {
        type: Number,
        trim: true,
        require: true
    },
    about: {
        type: String,
        trim: true
    },//luu mk uuid
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
    // password: {
    //     type: String,
    //     require: true,
    //     trim: true
    // }

},{ timestamps: true });

//dom ảo
userSchema.virtual('password')
    .set( function( password ) {
        // 1. tạo field ảo _password
        this._password = password;

        // 2. tạo 1 đoạn mã độc nhất (uuid) gán vào field salt
        this.salt = uuidv1();

        //3. mã hóa mật khẩu bằng phương thức encryptPassword được tạo ở dưới, sau đó gán vào field hashed_password
        this.hashed_password = this.encryptPassword(password);
    })

//set phương thức (methods)
userSchema.methods = {
    // mã hóa ngược hashed_password 
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    // phương thức mã hóa mật khẩu
    encryptPassword: function (password) {
        //kiểm tra xem đã có mật khẩu hay chưa? nếu chưa thì trả về rỗng
        if(!password) return "";
        // nếu có mật khẩu thì xử lý ngoại lệ mã hóa mật khẩu
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return "";
        }
    }
}


module.exports = mongoose.model('User', userSchema);