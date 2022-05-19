/* eslint-disable no-unused-vars */
const { v4 } = require('uuid')

const uuidv4 = v4

const MailBotClient = require('../mail/MailBotClient')
const { connection } = require('../config')

const args = process.argv.slice(2)

const client = new MailBotClient({
  connection,
})

client.enqueue2(
  'community-repeatable-mail15',
  {
    mailOpts: {
      from: 'manast@taskforce.sh',
      to: args[0],
      subject: 'Welcome to our community',
      text: `Random Id for you my friend: ${String(uuidv4())} - get this code and then join the community!!`,
    },
  },
  {
    jobId: String(uuidv4()),
    removeOnComplete: true,
    removeOnFail: 10,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
    repeat: {
      immediately: true,
      every: 10 * 1000,
      limit: 3,
    },
  },
)
