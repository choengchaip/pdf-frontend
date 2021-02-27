import urlJoin from "url-join";

export default class Config {
    static get config() {
        return {
            BASE_API: process.env.BASE_API
        }
    }

    static menus(role: 'USER' | 'SIGNER' | 'ADMIN') {
        return [
            {
                title: 'PDF',
                children: [
                    {
                        title: 'Upload PDF',
                        to: '/upload-pdf'
                    },
                    {
                        title: 'My PDFs',
                        to: '/pdfs'
                    },
                    {
                        title: 'Approve',
                        to: '/approve',
                        isHide: role === 'USER',
                    }
                ]
            },
            {
                title: 'Admin',
                isHide: role !== 'ADMIN',
                children: [
                    {
                        title: 'User',
                        to: '/admin-users'
                    },
                    {
                        title: 'PDF',
                        to: '/admin-pdfs'
                    },
                    {
                        title: 'Activity',
                        to: '/admin-activities'
                    }
                ]
            }
        ]
    }

    static BASE_API = (path: string): string => {
        return urlJoin(`${Config.config.BASE_API}`, path)
    }
}