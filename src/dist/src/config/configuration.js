"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '12h',
    },
});
//# sourceMappingURL=configuration.js.map