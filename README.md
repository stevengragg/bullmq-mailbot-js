# bullmq-mailbot-js
JavaScript port for example [bullmq-mailbot](https://github.com/taskforcesh/bullmq-mailbot) on ES6+

See [BullMQ Tutorial - Mailbot](https://blog.taskforce.sh/implementing-mail-microservice-with-bullmq/)
This tutorial shows how to easily create a bot for sending emails. The tutorial is divided into several parts, every part is located on a different branch so that you can navigate the code easily matching the tutorial text.

## Install

Just clone this repo and when inside the repo install the dependencies:

```bash
  npm install
```

and then run the main service:

```bash
  npm start
```

To test the service, in a separate terminal, run:
```bash
  npm test 'your_destination@email.com'

  # Stop the main service and send several messages, then start the service again.
  # You can see how all messages are resent.
  # Also you can run previous test command.
  npm run test-retry 'your_destination@email.com'
```

You can check results with the fake SMTP service [Ethereal](https://ethereal.email/) by previewURL that logs in the console where the main service is running.
```bash
# > npm start
# Worker listening for jobs

# Completed job 1 successfully, sent email to your_destination@email.com
# Preview URL: https://ethereal.email/message/X10VNAfHaE2Q4Y27YJkgU3B3LiUoCotYAAACqcDAPmq3oahUiWxXDmkS1GI
```

**Note**, in order to be able to send emails with this module you need to a local Redis™ instance running.

JavaScript implementation:
- [x] part1
- [ ] part2
- [ ] part3