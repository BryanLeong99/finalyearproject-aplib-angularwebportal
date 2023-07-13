import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JSEncrypt } from 'jsencrypt';
import { sha256 } from 'js-sha256';
// import * as sha256 from 'fast-sha256';
import * as CryptoJS from 'crypto-js/sha256';
import * as utf8 from 'utf8';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  encrypt: any = new JSEncrypt({});
  publicKey = "-----BEGIN PUBLIC KEY-----\n"
  + "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg85tUPN/+3iXnm9oMnBC\n"
  + "THCjEgNLnQis6x2bcU/fxKhNfYxyI4AO5+kDaypGxw2xgVON0YnAi0l8FrYrhzaC\n"
  + "hv7Bkg5kQoNYBxifum0TpQOA74Pq1L5FN6pdm4+fvD/Apwtrz3yAYXMSoLYxuYqx\n"
  + "Rx97BtUFmVk99zioz7u2rx4WdTLETUDrDuwRLmMsaStfUkWVeOE6sVvAxUy7+gWw\n"
  + "DsTPWK2YkmD/mjro05LwOGTEOUUKbRIVxNCX2BAHDg7XxJ1KdNPcma7Lfv8tTy47\n"
  + "sWGR2y52JY8R+n4ZSJbkmHZhF9m3VCVKhWMcsaGgIkXPl4Qq2l/lB6hra+rw5bRK\n"
  + "5wIDAQAB\n"
  + "-----END PUBLIC KEY-----";

  privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCDzm1Q83/7eJee\n' + 
  'b2gycEJMcKMSA0udCKzrHZtxT9/EqE19jHIjgA7n6QNrKkbHDbGBU43RicCLSXwW\n' +
  'tiuHNoKG/sGSDmRCg1gHGJ+6bROlA4Dvg+rUvkU3ql2bj5+8P8CnC2vPfIBhcxKg\n' +
  'tjG5irFHH3sG1QWZWT33OKjPu7avHhZ1MsRNQOsO7BEuYyxpK19SRZV44TqxW8DF\n' +
  'TLv6BbAOxM9YrZiSYP+aOujTkvA4ZMQ5RQptEhXE0JfYEAcODtfEnUp009yZrst+\n' +
  '/y1PLjuxYZHbLnYljxH6fhlIluSYdmEX2bdUJUqFYxyxoaAiRc+XhCraX+UHqGtr\n' +
  '6vDltErnAgMBAAECggEBAIOholaX95aChpj5lcvZhLymOJUCqX74bQiZluWA6W6S\n' +
  'zmC15D9D4p8EfB+IJwsfx8fqU9WRhrMT/lMIN0xfyddbkKF2sfYjCcR8ePhLerTv\n' +
  'XNLWoa05IBNJlxaGRvZPjOzGYTLjmaq4qz/I9LvhoM3wyIK4N1FAaLv+38gmJXmY\n' +
  'TM8QZ8Fb5GSPLhDtT0Qakes9dJRu0rxJlaBYz+jemEw7DxvWm9asgyO/EpYQYsop\n' + 
  '0mBrRo1CQVc1202L9wBO+VlzNh9xtIbgI3QiuSF1joXXr6icft4wa5KZ1ShvRuwO\n' +
  'WxlTnigzLJgZVTedNNW5Cd23VRjP9KNXfIAZ+q6xjVECgYEA76R7R9MJIZAMvKIm\n' +
  'Ulv1waWuOP2IhR4wOZBfR+RKHbU8400uUmNFguBnJX+fe8ePgIbcAEodDUsX27ag\n' +
  'DOAr+EGPNWit2XITPgpVU8vU0VP7i7zXIohWX4jz+Ocg2aWIfpTQsRqMoTrbOMwB\n' +
  '564wyy6y41NdVL9GfqbB5ap0WHUCgYEAjM2dOtZnG6QEPFH96La4ubIx3pEookGR\n' + 
  'y6X8/wy8C1dZ1Tju0frJj2PWqfhLsTq0eCPJeY/azxD4WPy6YKAHPhJlrOaBie5N\n' + 
  'ovOcUbOK6wM3hP6qiBYqCcHZs1qRSr8HK9n9hOBTVzWu9bSo2RIcOz573AS/wGM+\n' + 
  '0yL2E1NLymsCgYBeBplgWwswIgb9VFnY4sAQVOOA9OlF4cxmKaFY4de6xEu5m6Tb\n' +
  'Kpwxd77A1cxLksdZVJCphGrVtmsMCCHQK3zVEVQRTps3wCyQoRlNoaJE58DA2T1I\n' +
  'DVpmbaPcO0OGYg6mK9meQ559/EvbgyAUOSJn9lC2JRVvlQUh2GgnprOzqQKBgCoB\n' +
  'IPmvgnz1dioEj8m/0OXc6hGqnkOhafwl3Y683tBHU85POLe9qCm1sBFuuC38BGCe\n' +
  '1HkGWFFTj7MEWhl/RAnZdSmabmSWieSl5ilddYDcqdBsJLWKXyogAXEHALcau+ny\n' +
  'EzZzsYkfw70bExAG3hMydcLSS935/YEBOgXT4JVXAoGBAJeNuzxXVkT7WOceKxM/\n' + 
  'MwzoWKzf5t/7EZjp+MmgW/LB8SU9UmfWoW/gGHPrQ2SXcXQkCfVGLqglY3KRmDyr\n' +
  'Nu5TeTj79ab3FLiSdElgHP5HyI4Opv7zmGmZVlvNkJQk2VjTIsx3JQ7OSPDrY3jw\n' +
  'IIg+FOqvS6YROFoi8W0A4OIu\n' + 
  '-----END RSA PRIVATE KEY-----';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  authenticate(username: string, password: string) {
    this.encrypt.setPublicKey(this.publicKey);
    this.encrypt.setPrivateKey(this.privateKey);
    
    // let hash = CryptoJS.SHA256(password);
    // hash.update(new TextEncoder().encode(password));
    let passwordHash = sha256(password);

    // console.log(sha256(password));
    // console.log(utf8.encode(password));

    console.log(passwordHash.toString());
    
    let encryptedPassword: string = encodeURIComponent(this.encrypt.encrypt(passwordHash));
    // let encryptedPassword: string = this.encrypt.encrypt(passwordHash);


    console.log(encryptedPassword);
    // console.log(this.encrypt.decrypt(encryptedPassword))

    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/authenticate?' +
    'username=' + username +
    '&password=' + encryptedPassword +
    '&device_token=' + '';

    // console.log(this.http.get(url));

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({username: username, password: password, device_token: ''}), {
      responseType: 'text',
    });

  }
}
