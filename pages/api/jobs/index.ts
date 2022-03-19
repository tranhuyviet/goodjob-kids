import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// add job done
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('ADD JOB DONE', req.body);

        res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        console.log(error);
    }
});

export default handler;
