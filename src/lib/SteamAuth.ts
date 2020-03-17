import {RelyingParty} from "openid";
import {InvalidTokenException} from "./exceptions/InvalidTokenException";
import {UrlGenerationFailedException} from "./exceptions/UrlGenerationFailedException";

export class SteamAuth {
  //region Statics
  private static _SteamOpenIdAuthUri = 'https://steamcommunity.com/openid';

  static async Create(ReturnUrl: string): Promise<SteamAuth> {
    const Instance = new SteamAuth(ReturnUrl);
    await Instance.Init();
    return Instance;
  }

  //endregion

  //region Instance Methods
  readonly #ReturnUrl: string;
  #RelyingParty: RelyingParty | null;

  private constructor(ReturnUrl: string) {
    this.#ReturnUrl = ReturnUrl;
    this.#RelyingParty = null;
  }

  async Init() {
    this.#RelyingParty = new RelyingParty(this.#ReturnUrl, null, true, false, []);
  }

  async Url(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if( this.#RelyingParty === null ) {
        reject(new UrlGenerationFailedException());
      } else {
        this.#RelyingParty.authenticate(SteamAuth._SteamOpenIdAuthUri, false, (err, authUrl) => {
          if (err !== null) {
            reject(new UrlGenerationFailedException());
          } else {
            resolve(authUrl!);
          }
        });
      }
    });
  }

  async Validate(UrlWillBeValidated: string): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      if( this.#RelyingParty === null ) {
        reject(new InvalidTokenException());
      } else {
        this.#RelyingParty.verifyAssertion(UrlWillBeValidated, (err, result) => {
          if( err !== null ) {
            reject(new InvalidTokenException());
          } else if( typeof result !== 'undefined' && typeof result.claimedIdentifier !== 'undefined' && result.claimedIdentifier !== null ) {
            if( !result.authenticated ) {
              reject(new InvalidTokenException());
            } else if( typeof result.claimedIdentifier !== 'undefined' ){
              const matches = result.claimedIdentifier.match(/\/id\/(.*)/);

              if( matches !== null ) {
                resolve(matches[1]);
              }
            } else {
              reject(new InvalidTokenException());
            }
          } else {
            reject(new InvalidTokenException());
          }
        });
      }
    });
  }

  //endregion
}
