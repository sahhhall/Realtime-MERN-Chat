

const notFound = (req,res,next) => {
    const err = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(err)
}



const globalErrorHandler = (err,req,res,next) => {
    // if ther any status code we use that else 500 internal server err 
    err.statusCode = err.statusCode || 500 ;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
}



module.exports = {
    notFound,
    globalErrorHandler
}