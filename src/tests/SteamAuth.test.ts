import SteamAuth from '..';

let SteamAuthLib: SteamAuth;
const rightUrl = 'https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=http%3A%2F%2Flocalhost%3A3003%2F';

beforeAll(async (done) => {
  SteamAuthLib = await SteamAuth.Create('http://localhost:3003/');
  done();
});

describe("Steam Auth", () => {
  it('should auth url be right', async () => {
    let generatedUrl = '';
    try {
      generatedUrl = await SteamAuthLib.Url();
    } catch(e) {
      console.log(e);
    }

    expect(generatedUrl).toBe(rightUrl);
  });

  it('should not validate the invalid url', async () => {
    let result = '';

    try {
      result = await SteamAuthLib.Validate('');
    } catch(e) {}

    expect(result).toBe('');
  });
});
