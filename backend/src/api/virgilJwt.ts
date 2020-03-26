import { Request, Response } from 'express';
import { initCrypto, VirgilCrypto, VirgilAccessTokenSigner } from 'virgil-crypto';
import { JwtGenerator } from 'virgil-sdk';

export const virgilJwt = async (req: Request, res: Response) => {
  const generator = await getJwtGenerator();
  const virgilJwtToken = generator.generateToken(req.body.identity);
  res.json({ virgilToken: virgilJwtToken.toString() });
}

/**
 * This function will generate a JSON WEB TOKEN based on the identity of the
 * user
 */
const getJwtGenerator = async () => {
  await initCrypto();

  const virgilCrypto = new VirgilCrypto();
  // initialize JWT generator with your App ID and App Key ID you got in
  // Virgil Dashboard.
  return new JwtGenerator({
    appId: `${process.env.APP_ID}`,
    apiKeyId: `${process.env.APP_KEY_ID}`,
    // import your App Key that you got in Virgil Dashboard from string.
    apiKey: virgilCrypto.importPrivateKey(`${process.env.APP_KEY}`),
    // initialize accessTokenSigner that signs users JWTs
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
    // JWT lifetime - 20 minutes (default)
    millisecondsToLive: 20 * 60 * 1000
  });
}


