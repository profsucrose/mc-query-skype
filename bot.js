const { ActivityHandler, MessageFactory } = require('botbuilder')
const mcstatus = require('./apis/mcstatus')

class MCQuery extends ActivityHandler {
    constructor() {
        super() 
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const message = context.activity.text
            if (!message.includes('/mc-query')) { return next() }

            const params = message.split(' ').splice(1)
            const requestIP = params[0] || 'ohs.us.to'
            const status = (await mcstatus.get(requestIP)).data
            const replyText = status.ip ?
                                status.online 
                                    ? status.players.online 
                                        ? status.players.list 
                                            ? `${requestIP} is online with ${status.players.online}/${status.players.max} 
                                            players: ${status.players.list.map(player => `  \n${player}`)}`
                                            : `${requestIP} is online with ${status.players.online}/${status.players.max} players`
                                        : `${requestIP} is online with ${status.players.online}/${status.players.max} active...`
                                    : `${requestIP} is not online...`
                                : `IP: '${requestIP}' isn't a valid Minecraft server!`
            await context.sendActivity(MessageFactory.text(replyText, replyText)) 
            return await next() 
        })
    }
}

module.exports.MCQuery = MCQuery 
