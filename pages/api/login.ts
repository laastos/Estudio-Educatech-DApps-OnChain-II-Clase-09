import { verifyMessage } from "ethers";

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { request } = req.query;
    if (request === 'nonce') {
      res.status(200).json({
        message: 'This is a GET request for nonce',
        nonce: 'Get unique nonce 123456'
      });
      return;
    } else {
      res.status(200).json({ message: 'This is a GET request' });
      return;
    }
  } else if (req.method === 'POST') {
    const { method, address, nonce, signature } = req.body;
    if (method === 'signature') {
      const addressFormatted = address.toLowerCase();
      const verifyAddress = verifyMessage(nonce, signature);
      if (verifyAddress.toLowerCase() === addressFormatted) {
        res.status(200).json(
          {
            message: 'Signature verified',
            success: true,
            token: 'This is a JWT token'
          }
        );
      }
    }
  }
}