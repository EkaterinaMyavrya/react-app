function promisify(fnToPromisify){

    return (...args) => {
       
        return new Promise((resolve, reject) => {    
                 
            fnToPromisify(...args, (error, result) => {
                if (error) {                
                    reject(error);
                } else {                
                    resolve(result);
                }
            });            
        });
    };
};


exports.promisify = (fnToPromisify) => promisify(fnToPromisify);

