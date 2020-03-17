import SteamAuth from '..';

let SteamAuthLib: SteamAuth;
const rightUrl = 'https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=http%3A%2F%2Flocalhost%3A3003%2F';
const rightValidationUrl = 'http://localhost:3003/?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198993844851&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198993844851&openid.return_to=http%3A%2F%2Flocalhost%3A3003%2F&openid.response_nonce=2020-03-17T17%3A42%3A26Z5g3NlBRaiBWSkFOeLvlFi2sxrLM%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=%2F0H29X9VgpRslxfTK4J940V5VYY%3D';

beforeAll(async (done) => {
  SteamAuthLib = await SteamAuth.Create('http://localhost:3003/');
  done();
});

describe("Steam Auth", () => {
  it('should auth url be right', async () => {
    let generatedUrl = '';
    try {
      generatedUrl = await SteamAuthLib.Url();
    } catch(e) {}

    expect(generatedUrl).toBe(rightUrl);
  });

  it('should validate the right return url', async () => {
    let result = '';

    try {
      result = await SteamAuthLib.Validate(rightValidationUrl);
    } catch(e) {}

    expect(result.length).toBeGreaterThan(0);
  });

  it('should not validate the invalid url', async () => {
    let result = '';

    try {
      result = await SteamAuthLib.Validate('');
    } catch(e) {}

    expect(result).toBe('');
  });
});
