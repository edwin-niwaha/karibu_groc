module.exports.isSalesAgent = function (req, res, next) {

    if (req.user.role === 'agent' || req.user.role === 'admin') {
        return next();
    } else {
        //   req.flash('danger', 'Not Authorized')
        //   res.redirect('/admin');
        res.send('Oops! You don\'t have access rights. <a href="http://localhost:8080/login"> Login here </a>')
    }
}
module.exports.isManager = function (req, res, next) {
    if (req.user.role === 'manager' || req.user.role === 'admin') {
        return next();
    } else {
        //   req.flash('danger', 'Not Authorized')
        //   res.redirect('/admin');
        res.send('Oops! You don\'t have access rights. <a href="http://localhost:8080/login"> Login here </a>')
    }
}
module.exports.isDirector = function (req, res, next) {
    if (req.user.role === 'director' || req.user.role === 'admin') {
        return next();
    } else {
        //   req.flash('danger', 'Not Authorized')
        //   res.redirect('/admin');
        res.send('Oops! You don\'t have access rights. <a href="http://localhost:8080/login"> Login here </a>')
    }
}

module.exports.isManagerOrSalesAgent = function (req, res, next) {
    if (req.user.role === 'manager' || req.user.role === 'agent' || req.user.role === 'admin') {
        return next();
    } else {
        //   req.flash('danger', 'Not Authorized')
        //   res.redirect('/admin');
        res.send('Oops! You don\'t have access rights. <a href="http://localhost:8080/login"> Login here </a>')
    }
}

module.exports.isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    } else {
        //   req.flash('danger', 'Not Authorized')
        //   res.redirect('/admin');
        res.send('Oops! You don\'t have access rights. <a href="http://localhost:8080/login"> Login here </a>')
    }
}


