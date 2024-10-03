export async function ticket (ctx: Context, next: () => Promise<any>) {
  const {
    state: { body },
    clients: { LMClient}
  } = ctx

  const { clientEmail, accountId, requesterEmail } = body;

  console.log (clientEmail)
  console.log (accountId)
  console.log (requesterEmail)

  console.info('Received ticket:', body)

  const teste = await  LMClient.validateAccount(accountId)

  console.log (teste)

  await next()
}
