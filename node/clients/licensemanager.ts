import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class LMClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/api`, context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async validateAccount(accountId: string) {
    return this.http.get(
      `/license-manager/pvt/accounts/${accountId}`,
      {
        metric: 'get-account',
      }
    )
  }

}
