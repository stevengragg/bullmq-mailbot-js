/* eslint-disable no-unused-vars */
const { v4 } = require('uuid')

const uuidv4 = v4

const MailBotClient = require('./mail/MailBotClient')
const { connection } = require('./config')

// const args = process.argv.slice(2)

const client = new MailBotClient({
  connection,
})

const { worker } = require('./mail/worker')

worker.on('completed', job => {
  console.info(`Completed job ${job.id} successfully - job name ${job.name} and parent jobid - ${job?.opts?.repeat?.jobId}, sent email to ${job.data.mailOpts.to}`)
  if (job.name === 'community-repeatable-mail15') {
    client.removeRepeatable(job?.opts?.repeat?.jobId)
  }
})
worker.on('failed', (job, err) => console.info(
  `Failed job ${job.id} with ${err}`,
))
