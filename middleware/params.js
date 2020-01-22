// -- Third party imports -- //
module.exports = (requiredparams) => {
    return async (ctx, next) => {
        const params = ctx.request.body;
        for (let i = 0; i < requiredparams.length; i++) {
            const param = requiredparams[i];

            if (params[param] === undefined) {
                ctx.body = {
                    response: `Missing required param: ${param}`,
                };
                ctx.status = 400;
                return;
            }
        }

        await next();
    };
};
