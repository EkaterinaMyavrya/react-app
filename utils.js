export const promisify = function(fnToPromisify){

    const result = (...arguments) => {
        return new Promise((resolve, reject) =>
        {
            // this?
            fnToPromisify.apply(this, arguments);
        });
    };

    return result;

};

