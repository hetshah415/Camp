module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","please log in first!!");
        return res.redirect("/user/login");
    }
    next();
}