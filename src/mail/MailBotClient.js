/* eslint-disable max-len */
const { Queue } = require('bullmq')
const { queueName } = require('../config')

// Here we use the function instead of class because we need to private field
function MailBotClient(opts) {
  // private field queue
  const queue = new Queue(queueName, {
    // defaultJobOptions: {
    //   attempts: 5,
    //   backoff: { type: 'exponential', delay: 3000 },
    // },
    ...opts,
  })

  this.enqueue = async function enqueue(jobName, mail) {
    await queue.add(jobName, mail)
    console.info(`Enqueued an email sending to ${mail.mailOpts.to}`)
  }

  this.enqueue2 = async function enqueue2(jobName, mail, options) {
    await queue.add(jobName, mail, options)
    console.info(`Enqueued an email sending to ${mail.mailOpts.to}`)
  }

  this.removeRepeatable = async function removeRepeatable(jobId, jobName, repeatOpts) {
    console.info('removeRepeatable: received jobName, repeatOpts', { jobId, jobName, repeatOpts })
    // const job = await queue.getJob(jobName, repeatOpts)
    // console.info('job: ', job)
    const repeatableJobs = await queue.getRepeatableJobs()
    console.info(repeatableJobs)
    const repeatableJob = repeatableJobs.length && repeatableJobs.find(item => item.id === jobId)
    console.info(repeatableJob)
    const res = await queue.removeRepeatableByKey(repeatableJob?.key)
    console.info(`Removing repeatable job - ${jobName}`)
    console.info('result: ', res)
  }

  this.pauseJob = async function pauseJob() {
    const pauseRes = await queue.pause()
    console.info('pause response: ', pauseRes)
  }

  this.close = function close() {
    return queue.close()
  }
}

module.exports = MailBotClient
