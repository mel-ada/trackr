const PubNub = require( 'pubnub' )

const CONFIG = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY
}

const pubnub = new PubNub( CONFIG )

const publish = ( message, channel='crimes' ) =>
  pubnub.publish({ channel, message })

module.exports = publish
