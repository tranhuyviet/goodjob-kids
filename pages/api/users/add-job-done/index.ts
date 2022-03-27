import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { resSuccess } from '../../../../utils/returnRes';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.body);

        return resSuccess(res, 'job-done-index');
    } catch (error) {
        console.log('error', error);
    }
});

export default handler;
