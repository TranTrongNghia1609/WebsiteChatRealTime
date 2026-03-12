import jwt from 'jsonwebtoken'
import User from '../models/User.js'
//authorization - xác minh user là ai
export const protectedRoute = (req, res, next) => {
  try {
    //Lấy token từ header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //Bearer <token>
    if(!token){
      return res.status(401).json({message:'Khong tim thay access token'});
    }
    //Xác nhận token hợp lệ
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decodeUser) => {
      if(err){
        console.error(err);
        return res.status(403).json({message: 'Access token het han hoac khong dung'})
      }
    //Tìm user
    const user = await User.findById(decodeUser.userId).select('-hashedPassword');
    if(!user){
      return res.status(404).json({message: 'Nguoi dung khong ton tai.'});
    }

    //Trả user về trong req
    req.user = user;
    next();
    })
    
  } catch (error) {
    console.log('Lỗi khi xác minh JWT trong authMiddleware', error);
    return res.status(500).json({message: 'Lỗi hệ thống'});
  }
}