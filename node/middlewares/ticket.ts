export async function ticket (ctx: Context, next: () => Promise<any>) {
  const {
    state: { body }
  } = ctx

  const { clientEmail, accountId, requesterEmail } = body;

  console.log (clientEmail)
  console.log (accountId)
  console.log (requesterEmail)

  console.info('Received ticket:', body)

  await next()
}
