import { DefaultConfig } from './config.default';

export default () => {
    const config: DefaultConfig = {};
    config.env = 'local';
    config.news = {
        pageSize: 20,
    };
    return config;
};
