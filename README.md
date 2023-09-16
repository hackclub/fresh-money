# Fresh Money

## Overview

Fresh Money is a daily email service that provides a summary of transactions occurring on [HCB](https://hcb.hackclub.com/hq). This project was launched last summer by  @abbyfischler as a part of her internship, to help promote Hack Club's dedication to financial transparency more. The Fresh Money email updates how money moves on [HCB](https://bank.hackclub.com/). you can stay updated on how the money moves within Hack Club.

## Want to recieve the email?
To start receiving the daily emails, follow the steps below:
1. Visit our GitHub repository at [GitHub Repository Link](https://github.com/hackclub/fresh-money).
2. Make a pull request (PR) by adding a line after line 55 in the repository.
3. Submit your changes.
4. Once your pull request is approved, you will be added to the recipient list, and you will start receiving the daily emails.

## Technical Details
Fresh Money operates as a serverless function deployed on Vercel, a cloud platform for static and serverless deployment. The function is triggered by Zapier, a workflow automation tool known as "zaps." When the zap is triggered, it runs the Vercel deployment, but it adds the date to the end of the url.

For example this is the regular URL for the serverless function: https://money-flow-five.vercel.app/api/emaily
The zapier then adds the date and then it looks like: https://money-flow-five.vercel.app/api/emaily?date={{164673864__date_year}}-{{164673864__date_month}}-{{164673864__date_day}}


## Feedback and Contributions
Currently I"m working on making it so you can run it locally, the issue is the API key is not public. If you have any suggestions or encounter any issues, please feel free to open an issue on the GitHub repository. I appreciate your involvement in making Fresh Money better for everyone.
