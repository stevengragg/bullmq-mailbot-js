const nodemailer = require('nodemailer')
const puppeteer = require('puppeteer')
const { smtp } = require('../config')

const transporter = nodemailer.createTransport(smtp)

module.exports = async job => {
  try {
    // TODO: Rewrite with const
    let attachments

    if (job.data.htmlAttachments) {
      attachments = await Promise.all(
        job.data.htmlAttachments.map(async attachment => {
          const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          })

          const page = await browser.newPage()

          await page.setContent(attachment.html)

          const pdf = await page.pdf({
            format: 'a4',
            printBackground: true,
          })

          await browser.close()

          return {
            filename: `${attachment.name}.pdf`,
            content: pdf,
          }
        }),
      )
    }

    const info = await transporter.sendMail({
      ...job.data.mailOpts,
      attachments,
    })
    const previewURL = nodemailer.getTestMessageUrl(info)
    console.info('Preview URL: %s', previewURL)

    return {
      info,
      previewURL,
    }
  } catch (e) {
    console.error(e)
  }
}
